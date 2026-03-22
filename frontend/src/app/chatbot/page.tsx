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
      text: "Hello! I am your Farmlink AI assistant. Ask me about products, farmers, orders, delivery, or selling.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await chatbotApi.ask(text);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.reply || "No reply received." },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: e.message || "Chatbot failed." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quick = [
    "Show vegetables",
    "Find farmers in Kathmandu",
    "How do I place an order?",
    "How do I add a product?",
  ];

  return (
    <AuthGuard>
      <PageHeader
        title="Farmlink AI Chatbot"
        text="Ask anything about Farmlink products, farmers, delivery, or platform usage."
        badge="OPENAI"
      />

      <DashboardShell>
        <div className="card card-pad" style={{ minHeight: 650 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxHeight: 420,
              overflowY: "auto",
              marginBottom: 20,
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
                    maxWidth: "78%",
                    padding: "14px 16px",
                    borderRadius: 18,
                    whiteSpace: "pre-line",
                    background: msg.role === "user" ? "#1f6f43" : "#f3f7f1",
                    color: msg.role === "user" ? "#fff" : "#1b281d",
                    border: msg.role === "bot" ? "1px solid #d8e6d2" : "none",
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
                    maxWidth: "78%",
                    padding: "14px 16px",
                    borderRadius: 18,
                    background: "#f3f7f1",
                    border: "1px solid #d8e6d2",
                  }}
                >
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            {quick.map((q, i) => (
              <button
                key={`${q}-${i}`}
                type="button"
                className="btn btn-secondary"
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              style={{ flex: 1 }}
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