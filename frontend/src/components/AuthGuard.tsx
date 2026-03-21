"use client";
import { getStoredUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function AuthGuard({ children, roles }: { children: React.ReactNode; roles?: string[] }) { const router = useRouter(); const [ready, setReady] = useState(false); useEffect(() => { const user = getStoredUser(); if (!user) { router.replace("/login"); return; } if (roles && !roles.includes(user.role)) { router.replace("/dashboard"); return; } setReady(true); }, [router, roles]); if (!ready) return <div className="empty">Checking access…</div>; return <>{children}</>; }
