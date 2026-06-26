"use client";

import { useState, useRef, FormEvent } from "react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useGallery } from "@/hooks/useGallery";
import { ImagePlus, Trash2, Loader2, Upload } from "lucide-react";

export default function AdminGallery() {
  const { images, loading } = useGallery();
  const fileRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

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

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!db || !fileRef.current?.files?.[0]) return;
    setUploading(true);
    try {
      const imageUrl = await uploadToImgBB(fileRef.current.files[0]);
      await addDoc(collection(db!, "gallery"), {
        imageUrl,
        label: labelRef.current?.value?.trim() || "",
        createdAt: Date.now(),
      });
      if (labelRef.current) labelRef.current.value = "";
      if (fileRef.current) fileRef.current.value = "";
      alert("Image uploaded successfully!");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!db || !confirm("Delete this image?")) return;
    await deleteDoc(doc(db!, "gallery", id));
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-foreground mb-6">Gallery Images</h1>

      <form
        onSubmit={handleUpload}
        className="flex flex-col sm:flex-row gap-3 mb-8 p-4 bg-surface rounded-2xl border border-white/5"
      >
        <input
          ref={labelRef}
          placeholder="Label (optional)"
          className="flex-1 px-4 py-2.5 bg-surface-light rounded-xl border border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-primary/50 transition-colors text-sm"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          required
          className="flex-1 px-4 py-2.5 bg-surface-light rounded-xl border border-white/10 text-foreground file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-background file:text-xs file:font-semibold file:cursor-pointer text-sm"
        />
        <button
          type="submit"
          disabled={uploading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.97] disabled:opacity-50 shrink-0"
        >
          {uploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Upload size={16} />
          )}
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-primary" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-muted">
          <ImagePlus size={40} className="mx-auto mb-3 opacity-50" />
          <p>No gallery images yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-surface border border-white/5"
            >
              <img
                src={img.imageUrl}
                alt={img.label || "Gallery"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                {img.label && (
                  <span className="text-white text-sm text-center font-medium">
                    {img.label}
                  </span>
                )}
                <button
                  onClick={() => handleDelete(img.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500/80 text-white text-xs rounded-lg hover:bg-red-500 transition-colors"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
