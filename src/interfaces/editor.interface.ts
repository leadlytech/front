type ComponentType = "button" | "text" | "price" | "image" | "video" | "space";

export interface ComponentItem {
  type: ComponentType;
  label: string;
  style?: React.CSSProperties;
  prefix?: string;
  value?: number;
  suffix?: string;
}
