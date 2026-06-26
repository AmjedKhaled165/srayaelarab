"use client";

import { useState } from "react";
import { useMenuItems } from "@/hooks/useMenuItems";
import MenuCard from "./MenuCard";
import { CATEGORIES } from "@/utils/constants";

export default function MenuSection() {
  const { items, loading, error } = useMenuItems();
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);

  const categories = CATEGORIES;

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Our Menu
          </h2>
          <p className="text-muted text-sm md:text-base max-w-md mx-auto">
            Crafted with passion, served with elegance
          </p>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === "All"
                  ? "bg-primary text-background"
                  : "bg-surface text-muted hover:text-foreground hover:bg-surface-light"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-primary text-background"
                    : "bg-surface text-muted hover:text-foreground hover:bg-surface-light"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl overflow-hidden border border-white/5 animate-pulse"
              >
                <div className="h-40 sm:h-48 bg-surface-light" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-surface-light rounded w-2/3" />
                  <div className="h-3 bg-surface-light rounded w-full" />
                  <div className="h-3 bg-surface-light rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400/80">{error}</p>
            <p className="text-muted text-sm mt-2">
              Make sure Firebase is configured and has menu items.
            </p>
          </div>
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No items in this category yet.</p>
          </div>
        )}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
