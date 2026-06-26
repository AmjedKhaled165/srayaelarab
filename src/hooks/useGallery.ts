"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GalleryImage } from "@/lib/types";

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    async function fetchGallery() {
      try {
        const q = query(collection(db!, "gallery"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setImages(
          snap.docs.map((d) => ({ id: d.id, ...d.data() })) as GalleryImage[]
        );
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return { images, loading };
}
