"use client";

import Link from "next/link";

export default function ChatbotFloatingButton() {
  return (
    <Link
      href="/chatbot"
      style={{
        position: "fixed",
        right: 22,
        bottom: 22,
        zIndex: 1000,
        background: "linear-gradient(135deg, #1f6f43, #2d8f57)",
        color: "#fff",
        width: 62,
        height: 62,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 14px 30px rgba(31,111,67,0.28)",
        fontSize: 26,
      }}
      title="Open chatbot"
    >
      💬
    </Link>
  );
}