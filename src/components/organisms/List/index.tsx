interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={(item as { id: number }).id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};
