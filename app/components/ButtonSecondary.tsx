import { Link } from "@remix-run/react";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function ButtonSecondary({ href, children }: Props) {
  return (
    <Link
      to={href}
      className="text-sm select-none outline-none py-1 px-6 transition-colors bg-gray-200/10 text-gray-300 border border-gray-400/20 hover:border-gray-400/40 rounded-full focus-visible:border-blue-500"
    >
      {children}
    </Link>
  );
}
