"use client";

import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuItem } from "@/lib/types";
import { Edit3, Trash2, Eye, EyeOff, Plus, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    if (!db) return;
    try {
      const q = query(collection(db!, "menuItems"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setItems(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })) as MenuItem[]
      );
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function toggleAvailability(id: string, current: boolean) {
    if (!db) return;
    await updateDoc(doc(db!, "menuItems", id), { available: !current });
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: !current } : i))
    );
  }

  async function handleDelete(id: string) {
    if (!db || !confirm("Delete this item?")) return;
    await deleteDoc(doc(db!, "menuItems", id));
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-foreground">Menu Items</h1>
        <Link
          href="/admin/add"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-background text-sm font-semibold rounded-xl hover:bg-primary-light transition-all active:scale-[0.97]"
        >
          <Plus size={16} />
          Add Item
        </Link>
      </div>

      {items.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p className="mb-2">No menu items yet.</p>
          <Link href="/admin/add" className="text-primary hover:underline text-sm">
            Add your first item
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-muted">
                <th className="px-4 py-3 font-medium">Item</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Available</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-light overflow-hidden shrink-0 flex items-center justify-center">
                        <span className="font-display text-xs text-primary">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{item.name}</p>
                        <p className="text-muted text-xs line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted hidden sm:table-cell">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 font-display text-primary">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        item.available ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.available ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                      {item.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleAvailability(item.id, item.available)}
                        className="p-2 rounded-lg text-muted hover:text-primary hover:bg-surface-light transition-all"
                        title="Toggle availability"
                      >
                        {item.available ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <Link
                        href={`/admin/edit/${item.id}`}
                        className="p-2 rounded-lg text-muted hover:text-primary hover:bg-surface-light transition-all"
                      >
                        <Edit3 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-surface-light transition-all"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
