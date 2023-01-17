import { Link as RLink } from "@remix-run/react";
import Link from "~/components/Link";
import PageLayout from "~/components/PageLayout";

export default function Index() {
  return (
    <>
      <PageLayout>
        <nav className="text-xs py-3 text-gray-400 flex items-center border-b border-gray-700">
          <p className="flex-1">
            Made by{" "}
            <Link href="https://alexpage.dev" external>
              Alex Page
            </Link>
          </p>
          <ul className="flex gap-6 justify-end">
            <li>
              ★ Star on{" "}
              <Link href="https://github.com/alex-page/jamzone.today" external>
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
        <div className="text-center pt-40">
          <h1 className="inline-grid relative">
            <div className="absolute -top-6 -right-2 text-rose-500 flex">
              <span className="text-xs border-rose-500 rounded font-semibold border-2 py-1 px-2">
                🍓 Alpha
              </span>
            </div>
            <span className="text-6xl font-bold">jamzone.today</span>
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            The standard for international collaboration.
          </p>
          <div className="mt-8">
            <RLink
              to="/editor"
              className="select-none text-white inline-flex font-semibold rounded-full bg-gradient-to-r from-red-500 to-rose-500 transition-shadow shadow-border shadow-red-400 hover:shadow-red-300 focus:outline-2 focus:outline-blue-500 focus:outline-offset-4 py-3 px-6"
            >
              Get started →
            </RLink>
          </div>
        </div>
      </PageLayout>

      <div className="mt-12 max-w-7xl mx-auto perspective-lg">
        <div className="rotate-x-25">{/* <ZoneTable /> */}</div>
      </div>
    </>
  );
}
