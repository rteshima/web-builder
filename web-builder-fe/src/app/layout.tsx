import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern Personal Site",
  description: "A fresh, animated personal landing built with Next.js, Three.js, and Framer Motion",
  other: {
    "theme-color": "#0a0a0a",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}

