import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Archivo } from "next/font/google";
import { Header } from "@/components/sections/header";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanchi - Self-hosted Celery monitoring. Built for developers.",
  description: "Real-time Celery task monitoring with automatic orphan detection, worker health tracking, and workflow automation. Open source and production-ready.",
  keywords: [
    "celery",
    "monitoring",
    "task queue",
    "python",
    "devops",
    "real-time",
    "websocket",
    "worker",
    "distributed tasks",
    "orchestration",
  ],
  authors: [{ name: "Kanchi Team" }],
  creator: "Kanchi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getkanchi.com",
    title: "Kanchi - Self-hosted Celery monitoring",
    description: "Real-time Celery task monitoring with automatic orphan detection and workflow automation.",
    siteName: "Kanchi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanchi - Self-hosted Celery monitoring",
    description: "Real-time Celery task monitoring with automatic orphan detection and workflow automation.",
    creator: "@czyber_",
  },
  metadataBase: new URL("https://getkanchi.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${archivo.variable} font-sans antialiased bg-[hsl(0,0%,3%)] text-[hsl(0,0%,90%)] overflow-x-hidden`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
