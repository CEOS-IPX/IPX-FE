type InventiveHeaderProps = {
  title: string;
  subtitle: string;
};

export default function InventiveHeader({ title, subtitle }: InventiveHeaderProps) {
  return (
    <div className="flex flex-col gap-0.75">
      <h3 className="text-label-13 text-primary-sub">{title}</h3>
      <h4 className="text-label-15 text-title-secondary">{subtitle}</h4>
    </div>
  );
}
