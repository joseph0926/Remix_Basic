import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request, params }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  if (authMode === "login") {
    // asdf
  } else {
    // asdf
  }
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
