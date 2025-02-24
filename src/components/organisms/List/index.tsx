interface ListProps {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}

export const List: React.FC<ListProps> = ({ items, renderItem }) => {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};
