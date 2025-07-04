export interface Caption {
  id: string;
  text: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CaptionItemProps {
  caption: Caption;
  index: number;
  isCopied: number | null;
  onCopy: (text: string, index: number) => void;
}
