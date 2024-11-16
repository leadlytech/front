type ComponentType = "button" | "text" | "price";

export interface ComponentItem {
  type: ComponentType;
  label: string;
  style?: React.CSSProperties;
  prefix?: string;
  value?: number;
  suffix?: string;
}
