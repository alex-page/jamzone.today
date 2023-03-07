interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return <div className="max-w-6xl mx-auto px-4 sm:px-8 ">{children}</div>;
}
