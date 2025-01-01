export default function ItineraryList({
  items,
}: {
  items: {
    time: string;
    description: string;
  }[];
}) {
  return (
    <ul className="flex flex-col gap-8">
      {items.map((item, index) => (
        <li key={index}>
          <div className="bg-gray-100 inline-block p-1 rounded uppercase bg-rose-200 font-header">
            {item.time}
          </div>
          <div>{item.description}</div>
        </li>
      ))}
    </ul>
  );
}
