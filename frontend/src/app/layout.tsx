import "./globals.css";
import type { Metadata } from "next";
import TopNav from "../components/TopNav";
import ChatbotFloatingButton from "@/components/ChatbotFloatingButton";

export const metadata: Metadata = {
  title: "Farmlink Plus",
  description: "Smart farm-to-market platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <ChatbotFloatingButton />
        {children}
      </body>
    </html>
  );
}