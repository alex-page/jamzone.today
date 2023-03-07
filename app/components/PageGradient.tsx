export default function PageGradient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-96 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgb(59 130 246 / .2), transparent)",
        }}
      ></div>
      {children}
    </>
  );
}
