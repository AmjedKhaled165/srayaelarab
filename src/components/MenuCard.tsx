import { MenuItem } from "@/lib/types";
import Image from "next/image";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <div
      className={`group relative bg-surface rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 ${
        !item.available ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-light to-surface flex items-center justify-center">
            <span className="font-display text-4xl text-primary/30">
              {item.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        {!item.available && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-muted/80 backdrop-blur-sm text-background text-xs font-semibold rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display text-lg text-foreground leading-tight">
            {item.name}
          </h3>
          <span className="shrink-0 font-display text-lg text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>
        {item.description && (
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
