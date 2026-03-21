"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import DashboardShell from "@/components/DashboardShell";
import PageHeader from "@/components/PageHeader";
import { cartApi, notificationApi, orderApi, productApi, getStoredUser } from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const user = getStoredUser();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    cart: 0,
    notifications: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, ordersRes, cartRes, notificationsRes] = await Promise.allSettled([
          productApi.list(),
          orderApi.list(),
          cartApi.get(),
          notificationApi.list(),
        ]);

        setStats({
          products:
            productsRes.status === "fulfilled" ? productsRes.value.products.length : 0,
          orders:
            ordersRes.status === "fulfilled" ? ordersRes.value.orders.length : 0,
          cart:
            cartRes.status === "fulfilled" ? cartRes.value.items.length : 0,
          notifications:
            notificationsRes.status === "fulfilled"
              ? notificationsRes.value.notifications.length
              : 0,
        });
      } catch {}
    };

    load();
  }, []);

  return (
    <AuthGuard>
      <PageHeader
        title={`Welcome back${user?.name ? `, ${user.name}` : ""}`}
        text="Manage products, orders, buyers, and platform activity from one beautiful dashboard."
        badge={user?.role ? `${user.role.toUpperCase()} PANEL` : "FARMLINK PLUS"}
      />

      <DashboardShell>
        <section className="kpi-strip">
          <div className="stat-card">
            <div className="stat-label">Products</div>
            <div className="stat-value">{stats.products}</div>
            <div className="stat-trend">Live marketplace items</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Orders</div>
            <div className="stat-value">{stats.orders}</div>
            <div className="stat-trend">Current order activity</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Cart Items</div>
            <div className="stat-value">{stats.cart}</div>
            <div className="stat-trend">Ready for checkout</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Notifications</div>
            <div className="stat-value">{stats.notifications}</div>
            <div className="stat-trend">Unread or recent alerts</div>
          </div>
        </section>

        <section className="grid-2">
          <div className="card card-pad card-soft">
            <div className="panel-head">
              <div>
                <div className="badge">Quick actions</div>
                <h3 className="title-md" style={{ marginTop: 12 }}>Move faster</h3>
              </div>
            </div>

            <div className="grid">
              <Link className="btn btn-primary" href="/marketplace">Explore marketplace</Link>
              <Link className="btn btn-secondary" href="/orders">View orders</Link>
              <Link className="btn btn-secondary" href="/cart">Open cart</Link>
              <Link className="btn btn-secondary" href="/profile">Edit profile</Link>
            </div>
          </div>

          <div className="card card-pad">
            <div className="panel-head">
              <div>
                <div className="badge">Overview</div>
                <h3 className="title-md" style={{ marginTop: 12 }}>Platform summary</h3>
              </div>
            </div>

            <p className="muted">
              Farmlink Plus connects farmers, restaurants, industrial buyers, and customers in one place.
              Use this dashboard to manage inventory, monitor orders, and keep communication organized.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
              <span className="chip">Fresh produce</span>
              <span className="chip">Reliable logistics</span>
              <span className="chip">Direct trade</span>
              <span className="chip">Smarter workflow</span>
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}