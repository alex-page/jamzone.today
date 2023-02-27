import { Link as RLink } from "@remix-run/react";

interface Props {
  external?: boolean;
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, external = false, children }: Props) {
  const linkClass =
    "font-medium rounded text-gray-100 focus:outline-offset-2 focus:outline-2 focus:outline-blue-500";

  if (external) {
    return (
      <a href={href} className={linkClass}>
        {children}
      </a>
    );
  }

  return (
    <RLink to={href} className={linkClass}>
      {children}
    </RLink>
  );
}
