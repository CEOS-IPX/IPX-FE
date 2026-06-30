type DividerProps = {
  children?: React.ReactNode;
};

export function Divider({ children }: DividerProps) {
  return (
    <div className="flex w-full items-center gap-4">
      <hr className="h-px flex-1 border-0 bg-outline-default" />
      {children && <span className="text-label-15 text-caption-label">{children}</span>}
      <hr className="h-px flex-1 border-0 bg-outline-default" />
    </div>
  );
}
