function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl px-6 py-4">{children}</div>
    </div>
  );
}

export default PageContainer;
