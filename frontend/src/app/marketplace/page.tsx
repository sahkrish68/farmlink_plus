"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { productApi, Product, getImageUrl } from "@/lib/api";

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const r = await productApi.list();
        setProducts(r.products || []);
      } catch (e: any) {
        setMsg(e.message || "Failed to load marketplace");
      }
    };

    load();
  }, []);

  return (
    <>
      <PageHeader
        title="Marketplace"
        text="Explore fresh products from farmers, restaurants, and industrial sellers."
        badge="FARMLINK PLUS"
      />

      <section className="section">
        <div className="container">
          {msg && <div className="muted" style={{ marginBottom: 14 }}>{msg}</div>}

          {products.length === 0 ? (
            <div className="empty">No products available.</div>
          ) : (
            <div className="grid-3">
              {products.map((product, index) => {
                const id = String((product as any)._id || (product as any).id || index);
                const imageSrc = getImageUrl(product.image);

                return (
                  <div key={id} className="product-card">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                          borderRadius: 18,
                          border: "1px solid #dce7d5",
                        }}
                      />
                    ) : (
                      <div className="product-image">🌾</div>
                    )}

                    <div className="badge">{product.category}</div>

                    <div>
                      <h3 className="title-md">{product.name}</h3>
                      <p className="muted">
                        {product.description || "Fresh marketplace product"}
                      </p>
                    </div>

                    <div className="list-stack">
                      <div><strong>Price:</strong> Rs {product.price} / {product.unit}</div>
                      <div><strong>Seller:</strong> {product.sellerName || "Unknown"}</div>
                      <div><strong>City:</strong> {product.city || "N/A"}</div>
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <Link href={`/product/${product.slug}`} className="btn btn-primary">
                        View details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}