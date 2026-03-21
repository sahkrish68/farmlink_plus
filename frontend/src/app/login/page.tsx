"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { authApi, saveSession } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await authApi.login(form);
      saveSession(res.token, res.user);
      router.push("/dashboard");
    } catch (e: any) {
      setMsg(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <section className="auth-side">
          <div className="badge" style={{ background: "rgba(255,255,255,0.16)", color: "#fff", borderColor: "rgba(255,255,255,0.18)" }}>
            Welcome to Farmlink Plus
          </div>

          <h1 className="title-xl" style={{ marginTop: 18, color: "#fff" }}>
            Smarter farm-to-market connections.
          </h1>

          <p className="subtitle">
            Log in to manage your orders, products, buyers, and profile from a cleaner modern dashboard.
          </p>

          <div className="auth-points">
            <div className="auth-point">Track orders in real time</div>
            <div className="auth-point">Manage products beautifully</div>
            <div className="auth-point">Work with farmers and buyers faster</div>
          </div>
        </section>

        <section className="auth-form">
          <div>
            <div className="badge">Sign in</div>
            <h2 className="title-lg" style={{ marginTop: 14 }}>Access your account</h2>
            <p className="muted">Use your registered details to continue.</p>
          </div>

          <form className="grid" onSubmit={submit}>
            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                className="input"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>

            <div className="field">
              <label>Role</label>
              <select
                className="select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
                <option value="restaurant">Restaurant</option>
                <option value="industrial">Industrial</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {msg && <div className="muted">{msg}</div>}

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="muted">
            Don’t have an account? <Link href="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>Create one</Link>
          </p>
        </section>
      </div>
    </main>
  );
}