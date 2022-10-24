import { Link } from "@remix-run/react";

interface Props {
  children: React.ReactNode;
  url: string;
}

export default function ButtonPrimary({ children, url }: Props) {
  return (
    <Link
      to={url}
      className="inline-flex py-3 px-6 font-semibold rounded-full bg-gradient-to-r from-red-500 to-rose-500 transition-shadow shadow-border shadow-red-400 hover:shadow-red-300 button-focus"
    >
      {children}
    </Link>
  );
}
