"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { clearSession, getStoredUser, User } from "@/lib/api";

const mainLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/farmers", label: "Farmers" },
    { href: "/cart", label: "Cart" },
    { href: "/orders", label: "Orders" },
    { href: "/notifications", label: "Notifications" },
    { href: "/messages", label: "Messages" },
    { href: "/chatbot", label: "Chatbot" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
  ];

const sellerLinks = [
  { href: "/products/add", label: "Add Product" },
  { href: "/products/manage", label: "Manage Products" },
];

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const syncAuth = () => {
      setUser(getStoredUser());
    };

    syncAuth();
    window.addEventListener("auth-changed", syncAuth);

    return () => {
      window.removeEventListener("auth-changed", syncAuth);
    };
  }, []);

  const logout = () => {
    clearSession();
    setUser(null);
    router.push("/login");
  };

  const isSeller =
    user?.role === "farmer" ||
    user?.role === "restaurant" ||
    user?.role === "industrial";

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container dashboard-shell">
        <aside className="sidebar">
          <div className="sidebar-group">
            <div className="sidebar-title">Workspace</div>

            {user && (
              <div className="card" style={{ padding: 14, marginBottom: 12, borderRadius: 18 }}>
                <div className="title-md" style={{ marginBottom: 4 }}>{user.name}</div>
                <div className="muted">{user.role}</div>
              </div>
            )}

            {mainLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${active ? "active" : ""}`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {isSeller && (
              <>
                <div className="sidebar-title">Seller Tools</div>

                {sellerLinks.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`sidebar-link ${active ? "active" : ""}`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </>
            )}

            <button
              className="btn btn-danger"
              style={{ marginTop: 14, width: "100%" }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="content-stack">{children}</main>
      </div>
    </section>
  );
}