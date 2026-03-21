"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import PageHeader from "@/components/PageHeader";
import DashboardShell from "@/components/DashboardShell";
import { cartApi, CartItem } from "@/lib/api";
import Link from "next/link";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const r = await cartApi.get();
      setItems(r.items || []);
      setTotal(r.total || 0);
    } catch (e: any) {
      setMsg(e.message || "Failed to load cart");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateQty = async (id: string, qty: number) => {
    if (qty < 1) return;
    try {
      await cartApi.update(id, qty);
      load();
    } catch (e: any) {
      setMsg(e.message || "Failed to update quantity");
    }
  };

  const remove = async (id: string) => {
    try {
      await cartApi.remove(id);
      load();
    } catch (e: any) {
      setMsg(e.message || "Failed to remove item");
    }
  };

  return (
    <AuthGuard>
      <PageHeader
        title="Cart"
        text="Review selected items, change quantity, and continue to checkout."
      />

      <DashboardShell>
        <div className="card card-pad">
          {msg && <div className="muted" style={{ marginBottom: 12 }}>{msg}</div>}

          {items.length === 0 ? (
            <div className="empty">Your cart is empty.</div>
          ) : (
            <>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      const product = item.product;
                      if (!product) return null;

                      const productId = String((product as any)._id || (product as any).id || index);
                      const price = Number(product.price || 0);
                      const qty = Number(item.quantity || 1);

                      return (
                        <tr key={productId}>
                          <td>{product.name || "Unnamed product"}</td>
                          <td>Rs {price}</td>
                          <td>
                            <input
                              className="input"
                              style={{ maxWidth: 100 }}
                              type="number"
                              min="1"
                              value={qty}
                              onChange={(e) => updateQty(productId, Number(e.target.value))}
                            />
                          </td>
                          <td>Rs {price * qty}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => remove(productId)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <h3>Total: Rs {total}</h3>

              <div style={{ display: "flex", gap: 10 }}>
                <Link href="/checkout" className="btn btn-primary">
                  Proceed to checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}