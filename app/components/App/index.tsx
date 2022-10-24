interface Props {
  fullwidth?: boolean;
  children: React.ReactNode;
}

export default function App({ fullwidth = false, children }: Props) {
  return (
    <div>
      <div
        className="fixed top-0 left-0 right-0 h-1/2 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, #1e293b, rgba(255,255,255,0))",
        }}
      ></div>
      {children}
    </div>
  );
}
