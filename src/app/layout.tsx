import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Streaming App",
  description: "My Streaming App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#141414] text-white selection:bg-red-600/30">
        <Header />
        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  );
}
