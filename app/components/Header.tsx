import { Link as RLink } from "@remix-run/react";
import Link from "~/components/Link";

export default function Header() {
  return (
    <nav className="text-xs mb-12 py-5 flex items-center justify-between border-b border-slate-700">
      <RLink
        to="/"
        className="flex text-sm items-center gap-2 font-medium rounded text-slate-100 focus:outline-offset-2 focus:outline-2 focus:outline-blue-500"
      >
        <span className="whitespace-nowrap">🍓 jamzone.today</span>
        <span className="text-rose-500 border-rose-500 border-2 rounded text-xs font-semibold py-px px-1">
          Alpha
        </span>
      </RLink>
      <ul className="flex gap-3 justify-end text-slate-400">
        <li>
          Made by{" "}
          <Link href="https://twitter.com/alexpage_" external>
            Alex Page
          </Link>
        </li>
        <li className="hidden sm:block">
          ★ Star on{" "}
          <Link href="https://github.com/alex-page/jamzone.today" external>
            GitHub
          </Link>
        </li>
      </ul>
    </nav>
  );
}
