"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import DashboardShell from "@/components/DashboardShell";
import PageHeader from "@/components/PageHeader";
import { chatbotApi } from "@/lib/api";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hello! I am Farmlink Assistant. Ask me about products, farmers, orders, delivery, or selling.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Show vegetables",
    "Find farmers in Kathmandu",
    "How do I place an order?",
    "How do I add a product?",
  ]);

  const sendMessage = async (customText?: string) => {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await chatbotApi.ask(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: res.reply || "Sorry, I could not reply right now.",
        },
      ]);

      setSuggestions(res.suggestions || []);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: e.message || "Chatbot is not available right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <PageHeader
        title="Farmlink Assistant"
        text="Ask about products, farmers, orders, delivery, and seller actions."
        badge="CHATBOT"
      />

      <DashboardShell>
        <div className="card card-pad" style={{ minHeight: 650 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxHeight: 430,
              overflowY: "auto",
              padding: "8px 4px 16px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "14px 16px",
                    borderRadius: 18,
                    background: msg.role === "user" ? "#1f6f43" : "#f4f7f2",
                    color: msg.role === "user" ? "#fff" : "#1d2a1f",
                    whiteSpace: "pre-line",
                    lineHeight: 1.5,
                    border: msg.role === "bot" ? "1px solid #dbe8d7" : "none",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "14px 16px",
                    borderRadius: 18,
                    background: "#f4f7f2",
                    border: "1px solid #dbe8d7",
                  }}
                >
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {suggestions.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <div className="muted" style={{ marginBottom: 10 }}>
                Quick questions
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {suggestions.map((item, index) => (
                  <button
                    key={`${item}-${index}`}
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => sendMessage(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 22,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              style={{ flex: 1, minWidth: 240 }}
            />
            <button className="btn btn-primary" onClick={() => sendMessage()} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}