import { DEFAULT_CAFE_INFO } from "@/utils/constants";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface-light"
      />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <span className="font-display text-3xl text-primary">P</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-4 tracking-tight">
          {DEFAULT_CAFE_INFO.name}
        </h1>

        <p className="text-lg md:text-xl text-muted mb-12 font-light tracking-wide">
          {DEFAULT_CAFE_INFO.tagline}
        </p>

        <a
          href="#menu"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-background font-medium rounded-full hover:bg-primary-light transition-all active:scale-95"
        >
          Explore Our Menu
        </a>
      </div>

      <a
        href="#menu"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
