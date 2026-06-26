"use client";

import { useEffect, useState, FormEvent, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CATEGORIES } from "@/utils/constants";
import { MenuCategory, MenuItem } from "@/lib/types";
import { Save, Image as ImageIcon, Loader2 } from "lucide-react";

export default function AdminEditItem() {
  const { id } = useParams();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState<{
    name: string;
    description: string;
    price: string;
    category: MenuCategory;
    available: boolean;
    imageUrl: string;
  }>({
    name: "",
    description: "",
    price: "",
    category: CATEGORIES[0],
    available: true,
    imageUrl: "",
  });

  useEffect(() => {
    if (!db || !id) return;
    async function load() {
      const snap = await getDoc(doc(db!, "menuItems", id as string));
      if (!snap.exists()) {
        router.push("/admin");
        return;
      }
      const data = snap.data() as MenuItem;
      setForm({
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        category: data.category,
        available: data.available,
        imageUrl: data.imageUrl || "",
      });
      if (data.imageUrl) setPreview(data.imageUrl);
      setLoading(false);
    }
    load();
  }, [id, router]);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  async function uploadToImgBB(file: File): Promise<string> {
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!key) throw new Error("ImgBB API key is missing");

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const formData = new FormData();
    formData.append("key", key);
    formData.append("image", base64);

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || "ImgBB upload failed");
    return json.data.url;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!db || !id) return;
    setBusy(true);

    try {
      const price = parseFloat(form.price);
      if (isNaN(price) || price <= 0) throw new Error("Invalid price");

      let imageUrl = form.imageUrl;

      if (fileRef.current?.files?.[0]) {
        imageUrl = await uploadToImgBB(fileRef.current.files[0]);
      }

      await updateDoc(doc(db!, "menuItems", id as string), {
        name: form.name.trim(),
        description: form.description.trim(),
        price,
        category: form.category,
        available: form.available,
        imageUrl,
      });

      router.push("/admin");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-display text-2xl text-foreground mb-6">Edit Menu Item</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-muted mb-1.5">Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-surface rounded-xl border border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-surface rounded-xl border border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Price *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-surface rounded-xl border border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1.5">Category *</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as MenuCategory })
              }
              className="w-full px-4 py-2.5 bg-surface rounded-xl border border-white/10 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => setForm({ ...form, available: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-surface rounded-full peer-checked:bg-primary peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-foreground after:rounded-full after:h-4 after:w-4 after:transition-all" />
          </label>
          <span className="text-sm text-muted">
            {form.available ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Image</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="relative w-full h-32 bg-surface rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/40 transition-colors overflow-hidden"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <ImageIcon size={24} className="text-muted" />
                <span className="text-xs text-muted">Click to upload</span>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {busy ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {busy ? "Saving..." : "Update Item"}
        </button>
      </form>
    </div>
  );
}
