"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { authApi, saveSession } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectByRole = (role?: string) => {
    switch (role) {
      case "admin":
        router.push("/dashboard");
        break;
      case "farmer":
        router.push("/dashboard");
        break;
      case "restaurant":
        router.push("/dashboard");
        break;
      case "industrial":
        router.push("/dashboard");
        break;
      case "customer":
        router.push("/dashboard");
        break;
      default:
        router.push("/dashboard");
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await authApi.login({
        email: form.email,
        password: form.password,
      });

      saveSession(res.token, res.user);
      setMsg(`Login successful. Logged in as ${res.user.role}.`);
      redirectByRole(res.user.role);
    } catch (e: any) {
      setMsg(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Login"
        text="Sign in to Farmlink Plus. Your role will be detected automatically."
        badge="WELCOME BACK"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <div className="card card-pad">
            <form className="grid" onSubmit={submit}>
              {msg && <div className="muted">{msg}</div>}

              <div className="field">
                <label>Email</label>
                <input
                  className="input"
                  type="email"
                  value={form.email || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  className="input"
                  type="password"
                  value={form.password || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="muted">
                Don&apos;t have an account? <Link href="/register">Register here</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}