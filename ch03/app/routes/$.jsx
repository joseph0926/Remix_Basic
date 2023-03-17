import { redirect } from "@remix-run/node";

export function loader({ params }) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }
  throw new Response("Page Not Found", { status: 404 });
}
