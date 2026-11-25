import { Fragment, type ReactNode } from "react";

type CardGridProps<T> = {
  className: string;
  items: readonly T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
};

export default function CardGrid<T>({ className, items, getKey, render }: CardGridProps<T>) {
  return (
    <div className={className}>
      {items.map((item) => <Fragment key={getKey(item)}>{render(item)}</Fragment>)}
    </div>
  );
}
