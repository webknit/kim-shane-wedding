export default function Title({ title }: { title: string }) {
  return (
    <h2 className="text-4xl mb-8 font-bold text-theme-green md:text-5xl uppercase">
      {title}
    </h2>
  );
}
