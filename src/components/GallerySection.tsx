"use client";

import { useState } from "react";
import { X, ImageIcon } from "lucide-react";
import { useGallery } from "@/hooks/useGallery";
import { GalleryImage } from "@/lib/types";

export default function GallerySection() {
  const { images, loading } = useGallery();
  const [selected, setSelected] = useState<GalleryImage | null>(null);

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

        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-2xl bg-surface animate-pulse"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1" }}
              />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <ImageIcon size={48} className="mx-auto mb-3 opacity-40" />
            <p>No photos in the gallery yet.</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelected(img)}
                className="break-inside-avoid block w-full rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <img
                  src={img.imageUrl}
                  alt={img.label || "Gallery"}
                  className="w-full h-auto object-cover"
                />
                {img.label && (
                  <div className="p-3 bg-surface">
                    <p className="text-xs text-muted">{img.label}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-foreground/60 hover:text-foreground p-2 z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div
            className="max-w-3xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.imageUrl}
              alt={selected.label || "Gallery"}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />
            {selected.label && (
              <p className="text-center text-sm text-muted mt-3">
                {selected.label}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
