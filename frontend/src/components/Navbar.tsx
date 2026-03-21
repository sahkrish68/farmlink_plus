"use client";
import Link from "next/link";
import { clearSession, getStoredUser } from "@/lib/api";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function Navbar() { const [userRole, setUserRole] = useState(""); const pathname = usePathname(); const router = useRouter(); useEffect(()=>{ const user = getStoredUser(); setUserRole(user?.role || ""); }, [pathname]); const logout=()=>{ clearSession(); router.push("/login"); }; return <div className="nav-shell"><div className="container navbar"><Link href="/" className="logo">Farmlink plus</Link><div className="nav-links"><Link href="/">Home</Link><Link href="/marketplace">Marketplace</Link><Link href="/farmers">Farmers</Link>{userRole ? <Link href="/dashboard">Dashboard</Link> : <Link href="/login">Login</Link>}{userRole && <Link href="/cart">Cart</Link>}{userRole && <Link href="/orders">Orders</Link>}{userRole && <button className="btn btn-secondary" onClick={logout}>Logout</button>}</div></div></div>; }
