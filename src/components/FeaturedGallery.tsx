"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

const GALLERY_PREVIEW = [
  { color: "from-primary/20 to-primary/5", label: "Interior" },
  { color: "from-amber-500/20 to-amber-500/5", label: "Signature Dish" },
  { color: "from-primary/15 to-primary/5", label: "Coffee Art" },
  { color: "from-amber-600/20 to-amber-600/5", label: "Desserts" },
];

export default function FeaturedGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              Our Gallery
            </h2>
            <p className="text-muted text-sm md:text-base">
              A glimpse into our world
            </p>
          </div>
          <Link
            href="/gallery"
            className="hidden sm:flex items-center gap-1.5 text-primary text-sm font-medium hover:text-primary-light transition-colors"
          >
            View Gallery <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_PREVIEW.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="aspect-square rounded-2xl bg-gradient-to-br border border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-lg md:text-xl text-foreground/40 group-hover:text-primary/60 transition-colors">
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.97]"
          >
            View Gallery <ArrowRight size={16} />
          </Link>
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
          >
            <X size={28} />
          </button>
          <div className="max-w-lg w-full aspect-square rounded-2xl bg-gradient-to-br flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(135deg, ${GALLERY_PREVIEW[selected].color.replace("from-", "").replace("to-", "to-")})`,
            }}
          >
            <span className="font-display text-2xl text-foreground/60">
              {GALLERY_PREVIEW[selected].label}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
