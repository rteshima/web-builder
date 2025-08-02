import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexaAI – Build with the Next Generation of AI",
  description:
    "NexaAI is an AI-first platform enabling teams to design, build and deploy generative experiences at production scale.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "NexaAI – Build with the Next Generation of AI",
    description:
      "NexaAI is an AI-first platform enabling teams to design, build and deploy generative experiences at production scale.",
    url: "https://nexa.ai",
    siteName: "NexaAI",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-indigo-500/90 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
