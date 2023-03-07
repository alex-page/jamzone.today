import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import PageGradient from "./components/PageGradient";

import stylesheet from "~/styles/tailwind.css";

export function links() {
  return [
    { rel: "stylesheet", href: stylesheet },
    {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍓</text></svg>",
    },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "jamzone.today",
  viewport: "width=device-width,initial-scale=1,maximum-scale=1",
});

export default function Root() {
  return (
    <html lang="en" className="dark bg-slate-900 text-zinc-100">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <PageGradient>
          <Outlet />
        </PageGradient>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
