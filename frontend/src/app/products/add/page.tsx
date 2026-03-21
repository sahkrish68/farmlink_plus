"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import DashboardShell from "@/components/DashboardShell";
import PageHeader from "@/components/PageHeader";
import { getStoredUser, productApi } from "@/lib/api";

export default function AddProductPage() {
  const router = useRouter();
  const user = getStoredUser();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    productType: "",
    description: "",
    quantityAvailable: "",
    unit: "",
    price: "",
    minOrderQuantity: "",
    stockStatus: "in_stock",
    deliveryOption: "",
    deliveryArea: "",
    expiryDate: "",
    city: "",
    imageUrl: "",
  });

  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isSeller =
    user?.role === "farmer" ||
    user?.role === "restaurant" ||
    user?.role === "industrial";

  const makeSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const previewUrl = useMemo(() => {
    if (imageMode === "upload" && imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (imageMode === "url" && form.imageUrl.trim()) {
      return form.imageUrl.trim();
    }
    return "";
  }, [imageMode, imageFile, form.imageUrl]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isSeller) {
      setMsg("Only sellers can add products.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("slug", form.slug || makeSlug(form.name));
      fd.append("category", form.category);
      fd.append("productType", form.productType);
      fd.append("description", form.description);
      fd.append("quantityAvailable", form.quantityAvailable);
      fd.append("unit", form.unit);
      fd.append("price", form.price);
      fd.append("minOrderQuantity", form.minOrderQuantity);
      fd.append("stockStatus", form.stockStatus);
      fd.append("deliveryOption", form.deliveryOption);
      fd.append("deliveryArea", form.deliveryArea);
      fd.append("expiryDate", form.expiryDate);
      fd.append("city", form.city);

      if (imageMode === "url" && form.imageUrl.trim()) {
        fd.append("imageUrl", form.imageUrl.trim());
      }

      if (imageMode === "upload" && imageFile) {
        fd.append("image", imageFile);
      }

      await productApi.create(fd);
      router.push("/products/manage");
    } catch (e: any) {
      setMsg(e.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <PageHeader
        title="Add product"
        text="Create a new product listing with stock, price, delivery, category, and image details."
        badge="SELLER TOOLS"
      />

      <DashboardShell>
        <div className="card card-pad">
          {!isSeller ? (
            <div className="empty">
              Only farmer, restaurant, and industrial accounts can add products.
            </div>
          ) : (
            <form className="grid" onSubmit={submit}>
              {msg && <div className="muted">{msg}</div>}

              <div className="form-grid">
                <div className="field">
                  <label>Product name</label>
                  <input
                    className="input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                        slug: makeSlug(e.target.value),
                      }))
                    }
                    placeholder="Potato"
                    required
                  />
                </div>

                <div className="field">
                  <label>Slug</label>
                  <input
                    className="input"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="potato"
                    required
                  />
                </div>

                <div className="field">
                  <label>Category</label>
                  <input
                    className="input"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Vegetable"
                    required
                  />
                </div>

                <div className="field">
                  <label>Product type</label>
                  <input
                    className="input"
                    value={form.productType}
                    onChange={(e) => setForm({ ...form, productType: e.target.value })}
                    placeholder="Fresh"
                  />
                </div>

                <div className="field">
                  <label>Quantity available</label>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    value={form.quantityAvailable}
                    onChange={(e) =>
                      setForm({ ...form, quantityAvailable: e.target.value })
                    }
                    placeholder="100"
                    required
                  />
                </div>

                <div className="field">
                  <label>Unit</label>
                  <input
                    className="input"
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    placeholder="kg"
                    required
                  />
                </div>

                <div className="field">
                  <label>Price</label>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="20"
                    required
                  />
                </div>

                <div className="field">
                  <label>Minimum order quantity</label>
                  <input
                    className="input"
                    type="number"
                    min="1"
                    value={form.minOrderQuantity}
                    onChange={(e) =>
                      setForm({ ...form, minOrderQuantity: e.target.value })
                    }
                    placeholder="1"
                  />
                </div>

                <div className="field">
                  <label>Stock status</label>
                  <select
                className="select"
                value={form.stockStatus}
                onChange={(e) =>
                    setForm({ ...form, stockStatus: e.target.value })
                }
                >
                <option value="in_stock">In stock</option>
                <option value="low_stock">Low stock</option>
                <option value="out_of_stock">Out of stock</option>
                </select>
                </div>

                <div className="field">
                  <label>Delivery option</label>
                  <input
                    className="input"
                    value={form.deliveryOption}
                    onChange={(e) =>
                      setForm({ ...form, deliveryOption: e.target.value })
                    }
                    placeholder="Pickup / Delivery"
                  />
                </div>

                <div className="field">
                  <label>Delivery area</label>
                  <input
                    className="input"
                    value={form.deliveryArea}
                    onChange={(e) =>
                      setForm({ ...form, deliveryArea: e.target.value })
                    }
                    placeholder="Bara"
                  />
                </div>

                <div className="field">
                  <label>Expiry date</label>
                  <input
                    className="input"
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) =>
                      setForm({ ...form, expiryDate: e.target.value })
                    }
                  />
                </div>

                <div className="field">
                  <label>City</label>
                  <input
                    className="input"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Bara"
                  />
                </div>
              </div>

              <div className="field">
                <label>Description</label>
                <textarea
                  className="textarea"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Fresh farm potato"
                />
              </div>

              <div className="card card-pad" style={{ background: "#f8fbf5" }}>
                <h3 className="title-md" style={{ marginBottom: 8 }}>Product image</h3>
                <p className="muted" style={{ marginBottom: 16 }}>
                  Choose either image URL or local upload.
                </p>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                  <button
                    type="button"
                    className={`btn ${imageMode === "url" ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => {
                      setImageMode("url");
                      setImageFile(null);
                    }}
                  >
                    Use image URL
                  </button>

                  <button
                    type="button"
                    className={`btn ${imageMode === "upload" ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => {
                      setImageMode("upload");
                      setForm((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                  >
                    Upload local image
                  </button>
                </div>

                {imageMode === "url" ? (
                    <div className="field">
                        <label>Add image URL</label>
                        <input
                        className="input"
                        type="url"
                        value={form.imageUrl || ""}
                        onChange={(e) =>
                            setForm((prev) => ({
                            ...prev,
                            imageUrl: e.target.value || "",
                            }))
                        }
                        placeholder="https://example.com/product.jpg"
                        />
                        <div className="muted">
                        Use a direct image link ending in .jpg, .jpeg, .png, .webp, etc.
                        </div>
                    </div>
                    ) : (
                    <div className="field">
                        <label>Upload image from computer</label>
                        <input
                        className="input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        />
                    </div>
                    )}
                {previewUrl && (
                  <div style={{ marginTop: 16 }}>
                    <div className="muted" style={{ marginBottom: 8 }}>Preview</div>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxWidth: 320,
                        borderRadius: 18,
                        border: "1px solid #dce7d5",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save product"}
                </button>
              </div>
            </form>
          )}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}