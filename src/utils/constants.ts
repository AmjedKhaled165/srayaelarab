import { CafeInfo } from "@/lib/types";

export const CATEGORIES = [
  "Hot Drinks",
  "Cold Drinks",
  "Desserts",
  "Main Courses",
  "Appetizers",
  "Specials",
] as const;

export const DEFAULT_CAFE_INFO: CafeInfo = {
  name: "Prestige Cafe",
  tagline: "Where Every Sip Tells a Story",
  address: "123 Elegance Avenue, Downtown",
  phone: "+1234567890",
  mapsUrl: "https://maps.google.com/?q=prestige+cafe",
  openingHours: "Mon–Sun: 7:00 AM – 11:00 PM",
  social: {
    instagram: "https://instagram.com/prestigecafe",
    facebook: "https://facebook.com/prestigecafe",
    tiktok: "https://tiktok.com/@prestigecafe",
  },
};
