export default function Title({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-4xl font-bold text-theme-green md:text-5xl uppercase">
        {title}
      </h2>

      {subTitle ? <p className="font-header text-2xl">{subTitle}</p> : null}
    </div>
  );
}
