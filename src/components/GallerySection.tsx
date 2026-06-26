"use client";

import { useState } from "react";
import { X } from "lucide-react";

const GALLERY_ITEMS = [
  { color: "from-primary/20 to-primary/5", label: "Interior" },
  { color: "from-amber-500/20 to-amber-500/5", label: "Signature Dish" },
  { color: "from-primary/15 to-primary/5", label: "Coffee Art" },
  { color: "from-amber-600/20 to-amber-600/5", label: "Desserts" },
  { color: "from-primary/25 to-primary/5", label: "Ambiance" },
  { color: "from-amber-500/15 to-amber-500/5", label: "Bar" },
  { color: "from-primary/20 to-transparent", label: "Events" },
  { color: "from-amber-600/15 to-transparent", label: "Behind the Scenes" },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 px-4 scroll-mt-16 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Gallery
          </h2>
          <p className="text-muted text-sm md:text-base max-w-md mx-auto">
            A glimpse into our world
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {GALLERY_ITEMS.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`break-inside-avoid block w-full aspect-[${i % 3 === 0 ? "3/4" : "1"}] rounded-2xl bg-gradient-to-br ${item.color} border border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group`}
              style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-xl md:text-2xl text-foreground/40 group-hover:text-primary/60 transition-colors">
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-foreground/60 hover:text-foreground p-2"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div
            className="max-w-2xl w-full aspect-square rounded-2xl bg-gradient-to-br"
            style={{
              backgroundImage: `linear-gradient(135deg, ${GALLERY_ITEMS[selected].color.replace("from-", "").replace("to-", "to-")})`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-3xl text-foreground/60">
                {GALLERY_ITEMS[selected].label}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
