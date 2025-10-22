export type Media = { video_url?: string; room_images?: string[] };

export type Room = {
  id: string;
  name: string;
  amenities: string[];
  rating: number;
  location: string;
  price: number;
  currency: string;
  discount: string;
  priceWithoutDiscount: number;
  priceInfo: string;
  media: Media;
};
