export default function HotelList({
  items,
}: {
  items: {
    name: string;
    description?: string;
    href: string;
  }[];
}) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <li className="bg-pink-50 p-4" key={index}>
          <h2 className="text-xl mb-8">
            <a className="underline" href={item.href}>
              {item.name}
            </a>
          </h2>

          {item.description && <p className="text-sm">{item.description}</p>}
        </li>
      ))}
    </ul>
  );
}
