"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getStoredUser, User } from "@/lib/api";
import { useEffect, useState } from "react";

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const syncAuth = () => {
      setUser(getStoredUser());
    };

    setMounted(true);
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

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand">
          <span className="brand-badge">🌿</span>
          <span>Farmlink Plus</span>
        </Link>

        <nav className="nav">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>

          <Link
            href="/marketplace"
            className={`nav-link ${pathname === "/marketplace" ? "active" : ""}`}
          >
            Marketplace
          </Link>

          <Link
            href="/farmers"
            className={`nav-link ${pathname === "/farmers" ? "active" : ""}`}
          >
            Farmers
          </Link>

          {!mounted ? (
            <Link
              href="/login"
              className={`nav-link ${pathname === "/login" ? "active" : ""}`}
            >
              Login
            </Link>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}
              >
                Dashboard
              </Link>

              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`nav-link ${pathname === "/login" ? "active" : ""}`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}