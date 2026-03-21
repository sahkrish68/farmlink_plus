"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import PageHeader from "@/components/PageHeader";
import DashboardShell from "@/components/DashboardShell";
import { notificationApi, Notification } from "@/lib/api";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const r = await notificationApi.list();
      setItems(r.notifications || []);
    } catch (e: any) {
      setMsg(e.message || "Failed to load notifications");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const mark = async (id: string) => {
    try {
      await notificationApi.read(id);
      await load();
    } catch (e: any) {
      setMsg(e.message || "Failed to mark notification");
    }
  };

  return (
    <AuthGuard>
      <PageHeader
        title="Notifications"
        text="View platform alerts, order updates, and system messages."
      />

      <DashboardShell>
        {msg && <div className="muted" style={{ marginBottom: 12 }}>{msg}</div>}

        <div className="grid">
          {items.length === 0 ? (
            <div className="empty">No notifications.</div>
          ) : (
            items.map((n, index) => {
              const notificationId = String((n as any)._id || (n as any).id || index);

              return (
                <div key={notificationId} className="card card-pad">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div>
                      <h3 className="title-md">{n.title}</h3>
                      <p>{n.message}</p>
                    </div>

                    {!n.isRead && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => mark(notificationId)}
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}