import { Link as RemixLink } from "@remix-run/react";

interface Props {
  url: string;
  children: React.ReactNode;
}

export default function Link({ url, children }: Props) {
  return (
    <RemixLink to={url} className="link">
      {children}
    </RemixLink>
  );
}
