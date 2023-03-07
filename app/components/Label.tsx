interface Props {
  as?: "label" | "p";
  htmlFor?: string;
  children: React.ReactNode;
}

export default function Label({ as = "label", htmlFor, children }: Props) {
  const Component = as;

  return (
    <Component className="block text-slate-400 text-xs mb-1" htmlFor={htmlFor}>
      {children}
    </Component>
  );
}
