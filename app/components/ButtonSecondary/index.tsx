interface Props {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function ButtonSecondary({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text-sm py-1 px-6 rounded-full transition-colors input button-focus"
    >
      {children}
    </button>
  );
}
