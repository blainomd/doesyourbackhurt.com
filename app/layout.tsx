import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Does Your Back Hurt? | $10/month yoga. No gym. No contract.",
  description:
    "80% of adults say yes. Most pay $150/month for a gym they don't use. We charge $10. Neighbor's backyard yoga, physician-monitored progress, and Medicare ACCESS MSK coverage if eligible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}<Analytics /></body>
    </html>
  );
}
