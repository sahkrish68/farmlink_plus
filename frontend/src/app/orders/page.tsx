"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import PageHeader from "@/components/PageHeader";
import DashboardShell from "@/components/DashboardShell";
import { orderApi, Order, getStoredUser } from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [msg, setMsg] = useState("");
  const role = getStoredUser()?.role;

  const load = async () => {
    try {
      const r = await orderApi.list();
      setOrders(r.orders || []);
    } catch (e: any) {
      setMsg(e.message || "Failed to load orders");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const update = async (id: string, status: string) => {
    try {
      await orderApi.updateStatus(id, status);
      await load();
    } catch (e: any) {
      setMsg(e.message || "Failed to update order");
    }
  };

  const cancel = async (id: string) => {
    try {
      await orderApi.cancel(id);
      await load();
    } catch (e: any) {
      setMsg(e.message || "Failed to cancel order");
    }
  };

  const canConfirm =
    role === "farmer" || role === "restaurant" || role === "industrial";

  return (
    <AuthGuard>
      <PageHeader
        title="Orders"
        text="Track placed orders and manage order status according to role."
      />

      <DashboardShell>
        <div className="card card-pad">
          {msg && <div className="muted" style={{ marginBottom: 12 }}>{msg}</div>}

          {orders.length === 0 ? (
            <div className="empty">No orders found.</div>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Buyer</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, index) => {
                    const orderId = String((o as any)._id || (o as any).id || index);

                    return (
                      <tr key={orderId}>
                        <td>#{orderId}</td>
                        <td>{o.buyer?.name || "Unknown buyer"}</td>
                        <td>{o.status}</td>
                        <td>Rs {o.totalAmount}</td>
                        <td style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {canConfirm && (
                            <button
                              className="btn btn-secondary"
                              onClick={() => update(orderId, "Confirmed")}
                            >
                              Confirm
                            </button>
                          )}

                          <button
                            className="btn btn-danger"
                            onClick={() => cancel(orderId)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}