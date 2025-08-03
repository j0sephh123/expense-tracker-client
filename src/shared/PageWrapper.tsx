export default function PageWrapper({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">{title}</h1>

      {children}
    </div>
  );
}