function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}

export default PageContainer;
