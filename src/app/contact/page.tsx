import Header from "@/components/Header";
import QuickActions from "@/components/QuickActions";
import Footer from "@/components/Footer";
import { DEFAULT_CAFE_INFO } from "@/utils/constants";
import { Phone, MapPin, Clock, Instagram, Facebook, Music2 } from "lucide-react";

export default function ContactPage() {
  const { address, phone, mapsUrl, openingHours, social, name, tagline } =
    DEFAULT_CAFE_INFO;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">
              Contact Us
            </h1>
            <p className="text-muted">{tagline}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-4 p-5 bg-surface rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Phone size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted mb-0.5">Call us</p>
                <p className="text-foreground font-medium">{phone}</p>
              </div>
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-surface rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <MapPin size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted mb-0.5">Visit us</p>
                <p className="text-foreground font-medium">{address}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 bg-surface rounded-2xl border border-white/5 md:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted mb-0.5">Opening hours</p>
                <p className="text-foreground font-medium">{openingHours}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-white/5 p-6">
            <h2 className="font-display text-xl text-foreground mb-4 text-center">
              Follow Us
            </h2>
            <div className="flex justify-center gap-4">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-surface-light flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 border border-white/5 transition-all"
                >
                  <Instagram size={22} />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-surface-light flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 border border-white/5 transition-all"
                >
                  <Facebook size={22} />
                </a>
              )}
              {social.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-surface-light flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 border border-white/5 transition-all"
                >
                  <Music2 size={22} />
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.97]"
            >
              <MapPin size={18} />
              Get Directions
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <QuickActions />
    </>
  );
}
