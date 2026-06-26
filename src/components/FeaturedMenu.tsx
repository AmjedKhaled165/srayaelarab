"use client";

import { useMenuItems } from "@/hooks/useMenuItems";
import MenuCard from "./MenuCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedMenu() {
  const { items, loading } = useMenuItems();
  const featured = items.filter((i) => i.available).slice(0, 4);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              From Our Menu
            </h2>
            <p className="text-muted text-sm md:text-base">
              A taste of what we offer
            </p>
          </div>
          <Link
            href="/menu"
            className="hidden sm:flex items-center gap-1.5 text-primary text-sm font-medium hover:text-primary-light transition-colors"
          >
            View Full Menu <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl overflow-hidden border border-white/5 animate-pulse"
              >
                <div className="h-40 sm:h-48 bg-surface-light" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-surface-light rounded w-2/3" />
                  <div className="h-3 bg-surface-light rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : featured.length === 0 ? (
          <p className="text-muted text-center py-12">
            No menu items available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:hidden">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.97]"
          >
            View Full Menu <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
