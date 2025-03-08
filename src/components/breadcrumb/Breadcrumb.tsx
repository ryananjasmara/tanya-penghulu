import { Breadcrumb as AntdBreadcrumb } from "antd";

interface BreadcrumbProps {
  items: {
    title: React.ReactNode;
    href?: string;
  }[];
  style?: React.CSSProperties;
}

export function Breadcrumb({ items, style }: BreadcrumbProps) {
  return (
    <div style={style}>
      <AntdBreadcrumb items={items} />
    </div>
  );
}
