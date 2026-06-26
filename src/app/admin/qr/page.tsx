"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import { Download, Upload } from "lucide-react";

export default function AdminQRPage() {
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function downloadQR() {
    if (!qrRef.current) return;
    const dataUrl = await toPng(qrRef.current, { quality: 1, pixelRatio: 4 });
    const link = document.createElement("a");
    link.download = "prestige-menu-qr.png";
    link.href = dataUrl;
    link.click();
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-display text-2xl text-foreground mb-2">QR Code Generator</h1>
      <p className="text-muted text-sm mb-6">
        Generate a high-resolution QR code that links to your digital menu.
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-muted mb-1.5">Your Website URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-cafe.vercel.app"
            className="w-full px-4 py-2.5 bg-surface rounded-xl border border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Logo (optional)</label>
          <label className="flex items-center gap-2 px-4 py-2.5 bg-surface rounded-xl border border-dashed border-white/10 cursor-pointer hover:border-primary/40 transition-colors text-sm text-muted hover:text-foreground">
            <Upload size={16} />
            {logo ? "Change logo" : "Upload logo for center of QR"}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
          {logo && (
            <button
              onClick={() => setLogo(null)}
              className="text-xs text-red-400 hover:underline mt-1"
            >
              Remove logo
            </button>
          )}
        </div>

        {url && (
          <div className="flex flex-col items-center gap-4 pt-4">
            <div
              ref={qrRef}
              className="bg-white p-4 rounded-2xl inline-block"
            >
              <QRCodeCanvas
                value={url}
                size={280}
                level="H"
                includeMargin
                imageSettings={
                  logo
                    ? {
                        src: logo,
                        height: 60,
                        width: 60,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>

            <button
              onClick={downloadQR}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.97]"
            >
              <Download size={18} />
              Download PNG
            </button>
          </div>
        )}

        {!url && (
          <div className="text-center py-12 text-muted text-sm">
            Enter a URL above to generate your QR code.
          </div>
        )}
      </div>
    </div>
  );
}
