type LoadingIndicatorProps = {
  label: string;
};

export function LoadingIndicator({ label }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="h-9 w-9 animate-spin rounded-full border-3 border-icon-primary-default border-t-transparent" />
      <span className="text-label-17 text-caption-label">{label}</span>
    </div>
  );
}
