import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import MainNavigation from "./components/MainNavigation";

import styles from "./styles/main.css";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation></MainNavigation>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  <html lang="en">
    <head>
      <Meta />
      <Links />
      <title>Error</title>
    </head>
    <body>
      <header>
        <MainNavigation></MainNavigation>
      </header>
      <main className="error">
        <h1>Error가 발생하였습니다!!!</h1>
        <p>{error.message}</p>
        <Link to="/">돌아기기</Link>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
