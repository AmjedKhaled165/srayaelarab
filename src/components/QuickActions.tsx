"use client";

import { Phone, MapPin } from "lucide-react";
import { DEFAULT_CAFE_INFO } from "@/utils/constants";

export default function QuickActions() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
      <div className="max-w-lg mx-auto flex gap-3 pointer-events-auto">
        <a
          href={`tel:${DEFAULT_CAFE_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.97] shadow-lg shadow-primary/25"
        >
          <Phone size={18} />
          Call Now
        </a>
        <a
          href={DEFAULT_CAFE_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-primary/40 text-primary font-semibold rounded-xl hover:bg-primary/10 transition-all active:scale-[0.97]"
        >
          <MapPin size={18} />
          Directions
        </a>
      </div>
    </div>
  );
}
