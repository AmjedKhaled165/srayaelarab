import { Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { DEFAULT_CAFE_INFO } from "@/utils/constants";
import Link from "next/link";

export default function HomeContact() {
  const { phone, address, mapsUrl, openingHours } = DEFAULT_CAFE_INFO;

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            Get in Touch
          </h2>
          <p className="text-muted text-sm md:text-base">
            We&apos;d love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center gap-3 p-6 bg-surface rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Phone size={22} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-0.5">Call us</p>
              <p className="text-foreground font-medium text-sm">{phone}</p>
            </div>
          </a>

          <div className="flex flex-col items-center gap-3 p-6 bg-surface rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock size={22} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-0.5">Open hours</p>
              <p className="text-foreground font-medium text-sm">
                {openingHours}
              </p>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-surface rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MapPin size={22} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-0.5">Visit us</p>
              <p className="text-foreground font-medium text-sm">{address}</p>
            </div>
          </a>
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-6 py-3 border border-primary/40 text-primary font-semibold rounded-xl hover:bg-primary/10 transition-all active:scale-[0.97]"
          >
            Full Contact Info <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
