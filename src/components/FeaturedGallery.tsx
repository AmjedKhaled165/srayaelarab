"use client";

import { useState } from "react";
import { X, ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useGallery } from "@/hooks/useGallery";
import { GalleryImage } from "@/lib/types";

export default function FeaturedGallery() {
  const { images, loading } = useGallery();
  const preview = images.slice(0, 4);
  const [selected, setSelected] = useState<GalleryImage | null>(null);

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

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-surface animate-pulse"
              />
            ))}
          </div>
        ) : preview.length === 0 ? (
          <div className="text-center py-12 text-muted">
            <ImageIcon size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No photos yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {preview.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelected(img)}
                className="aspect-square rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <img
                  src={img.imageUrl}
                  alt={img.label || "Gallery"}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.97]"
          >
            View Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-foreground/60 hover:text-foreground p-2 z-10"
          >
            <X size={28} />
          </button>
          <div
            className="max-w-2xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.imageUrl}
              alt={selected.label || "Gallery"}
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
