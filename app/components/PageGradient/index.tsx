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
            "radial-gradient(ellipse 80% 50% at 50% -20%, #1e293b, rgba(255,255,255,0))",
        }}
      ></div>
      {children}
    </>
  );
}
