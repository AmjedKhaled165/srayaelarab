import { Instagram, Facebook, Music2, Clock, MapPin } from "lucide-react";
import { DEFAULT_CAFE_INFO } from "@/utils/constants";

export default function Footer() {
  const { address, openingHours, social, name } = DEFAULT_CAFE_INFO;

  return (
    <footer id="footer" className="py-16 px-4 bg-black/40 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <h3 className="font-display text-xl text-primary mb-4">{name}</h3>
            <p className="text-muted text-sm leading-relaxed mb-5">
              Where every sip tells a story and every bite creates a memory.
            </p>
            <div className="flex gap-3">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-surface-light border border-white/5 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-surface-light border border-white/5 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {social.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-surface-light border border-white/5 transition-all"
                  aria-label="TikTok"
                >
                  <Music2 size={18} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-display text-foreground mb-4 flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              Opening Hours
            </h4>
            <p className="text-muted text-sm">{openingHours}</p>
          </div>

          <div>
            <h4 className="font-display text-foreground mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              Find Us
            </h4>
            <p className="text-muted text-sm leading-relaxed mb-3">{address}</p>
            <a
              href={DEFAULT_CAFE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary text-sm hover:text-primary-light transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center text-muted text-xs">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
