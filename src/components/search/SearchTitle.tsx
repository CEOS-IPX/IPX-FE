type TitleProps = {
  stepnum: number;
  title: string;
  label?: string;
};

export default function Title({ stepnum, title, label }: TitleProps) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-bg-primary-hover text-label-emphasis-15 text-inverse-on-primary">
        {stepnum}
      </div>

      <div className="flex flex-row gap-2 items-center">
        <p className="text-title-primary text-title-22">{title}</p>
        <p className="text-caption-label text-label-15">{label}</p>
      </div>
    </div>
  );
}
