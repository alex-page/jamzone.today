interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return <div className="max-w-6xl mx-auto sm:px-8 px-2">{children}</div>;
}
