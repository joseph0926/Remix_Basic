import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react";

import sharedStyles from "~/styles/shared.css";
import Error from "./components/util/Error";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const Document = ({ title, children }) => {
  return (
    <html lang="en">
      <title>{title}</title>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return <Document></Document>;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <Document title={caughtResponse.statusText}>
      <Error title={caughtResponse.statusText}>
        <p>{caughtResponse.data?.message || "Someting went wrong,,, Please Retry"}</p>
        <p>
          Back to <Link to="/">Home</Link>
        </p>
      </Error>
    </Document>
  );
}
export function ErrorBoundary({ error }) {
  return (
    <Document title="Error">
      <Error title="Error!!!">
        <p>{error.message || "Someting went wrong,,, Please Retry"}</p>
        <p>
          Back to <Link to="/">Home</Link>
        </p>
      </Error>
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}
