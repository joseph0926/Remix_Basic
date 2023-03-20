import { hash, compare } from "bcryptjs";
import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));

  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email: email } });

  if (existingUser) {
    const error = new Error("이미 사용중인 이메일입니다");
    error.status = 422;
    throw error;
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({ data: { email: email, password: hashedPassword } });
  return createUserSession(user.id, "/");
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email: email } });

  if (!existingUser) {
    const error = new Error("해당 이메일로 가입된 정보를 찾을 수 없습니다");
    error.status = 401;
    throw error;
  }

  const isPasswordEquel = await compare(password, existingUser.password);
  if (!isPasswordEquel) {
    const error = new Error("비밀번호를 확인해주세요");
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, "/expenses");
}

export async function deleteUserSession(request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession();

  if (!userId) {
    throw redirect("/auth?mode=login");
  }
}
