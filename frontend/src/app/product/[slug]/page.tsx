"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { productApi, Product, cartApi, getImageUrl } from "@/lib/api";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const load = async () => {
      try {
        setLoading(true);
        setMsg("");
        const r = await productApi.get(slug);
        setProduct(r.product);
      } catch (e: any) {
        setProduct(null);
        setMsg(e.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const add = async () => {
    if (!product) return;

    try {
      await cartApi.add(String((product as any)._id || (product as any).id), 1);
      setMsg("Added to cart");
    } catch (e: any) {
      setMsg(e.message || "Action failed");
    }
  };

  const imageSrc = getImageUrl(product?.image);

  return (
    <>
      <PageHeader
        title="Product details"
        text="Review product details, quantity, price, seller, and availability."
        badge="MARKETPLACE"
      />

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="empty">Loading product...</div>
          ) : !product ? (
            <div className="empty">{msg || "Product not found"}</div>
          ) : (
            <div className="card card-pad">
              <div className="grid grid-2">
                <div>
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={product.name}
                      style={{
                        width: "100%",
                        borderRadius: 20,
                        border: "1px solid #dce7d5",
                        objectFit: "cover",
                        maxHeight: 420,
                      }}
                    />
                  ) : (
                    <div className="product-image" style={{ minHeight: 320 }}>
                      🌾
                    </div>
                  )}
                </div>

                <div>
                  <span className="badge">{product.category}</span>

                  <h2 className="title-lg" style={{ marginTop: 14 }}>
                    {product.name}
                  </h2>

                  {product.productType && (
                    <p className="muted" style={{ marginTop: 8 }}>
                      {product.productType}
                    </p>
                  )}

                  <p style={{ marginTop: 14 }}>
                    {product.description || "No description available."}
                  </p>

                  <div className="grid" style={{ marginTop: 18 }}>
                    <div className="card" style={{ padding: 14, borderRadius: 16 }}>
                      <strong>Seller:</strong> {product.sellerName || "Unknown"}{" "}
                      {product.sellerRole ? `(${product.sellerRole})` : ""}
                    </div>

                    <div className="card" style={{ padding: 14, borderRadius: 16 }}>
                      <strong>Price:</strong> Rs {product.price} / {product.unit}
                    </div>

                    <div className="card" style={{ padding: 14, borderRadius: 16 }}>
                      <strong>Quantity available:</strong> {product.quantityAvailable}
                    </div>

                    {product.city && (
                      <div className="card" style={{ padding: 14, borderRadius: 16 }}>
                        <strong>City:</strong> {product.city}
                      </div>
                    )}

                    {product.deliveryOption && (
                      <div className="card" style={{ padding: 14, borderRadius: 16 }}>
                        <strong>Delivery:</strong> {product.deliveryOption}
                      </div>
                    )}

                    {product.deliveryArea && (
                      <div className="card" style={{ padding: 14, borderRadius: 16 }}>
                        <strong>Delivery area:</strong> {product.deliveryArea}
                      </div>
                    )}

                    {product.stockStatus && (
                      <div className="card" style={{ padding: 14, borderRadius: 16 }}>
                        <strong>Stock status:</strong> {product.stockStatus}
                      </div>
                    )}

                    {product.minOrderQuantity ? (
                      <div className="card" style={{ padding: 14, borderRadius: 16 }}>
                        <strong>Minimum order:</strong> {product.minOrderQuantity}
                      </div>
                    ) : null}
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
                    <button className="btn btn-primary" onClick={add}>
                      Add to cart
                    </button>

                    <Link className="btn btn-secondary" href="/messages">
                      Contact seller
                    </Link>

                    <Link className="btn btn-ghost" href="/marketplace">
                      Back to marketplace
                    </Link>
                  </div>

                  {msg && <div className="muted" style={{ marginTop: 12 }}>{msg}</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}