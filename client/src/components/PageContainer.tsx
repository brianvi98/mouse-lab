export type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className="flex-1">
      <div className={`mx-auto max-w-6xl px-6 py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
