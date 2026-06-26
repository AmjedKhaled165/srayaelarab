export type MenuCategory =
  | "Hot Drinks"
  | "Cold Drinks"
  | "Desserts"
  | "Main Courses"
  | "Appetizers"
  | "Specials";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  imageUrl: string;
  available: boolean;
  createdAt: number;
}

export interface CafeInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  mapsUrl: string;
  openingHours: string;
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}
