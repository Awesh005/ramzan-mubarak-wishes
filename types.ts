export enum WishStyle {
  CLASSIC = 'Classic',
  MODERN = 'Modern',
  URDU = 'Urdu',
  EMOTIONAL = 'Emotional'
}

export interface WishData {
  sender: string;
  receiver?: string;
  style: WishStyle;
}

export interface WishTemplate {
  title: string;
  message: (sender: string, receiver?: string) => string;
}
