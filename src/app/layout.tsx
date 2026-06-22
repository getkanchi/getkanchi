import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/sections/header";
import "./globals.css";

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
  title: "Kanchi - Self-hosted Celery operations",
  description:
    "Self-hosted Celery monitoring, failure triage, safe task reruns, workflow automation, task progress, and operational audit history.",
  keywords: [
    "celery",
    "monitoring",
    "task recovery",
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
    url: "https://kanchi.io",
    title: "Kanchi - Self-hosted Celery operations",
    description:
      "Monitor Celery, triage failures, rerun tasks safely, and automate repeat recovery workflows.",
    siteName: "Kanchi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanchi - Self-hosted Celery operations",
    description:
      "Monitor Celery, triage failures, rerun tasks safely, and automate repeat recovery workflows.",
    creator: "@czyber_",
  },
  metadataBase: new URL("https://kanchi.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body
        className={`${GeistSans.variable} ${jetbrainsMono.variable} gap-0 ${archivo.variable} flex min-h-screen flex-col font-sans antialiased bg-[hsl(0,0%,3%)] text-[hsl(0,0%,90%)] overflow-x-hidden`}
      >
        <Header />
        <main className="md:pt-[3.5rem]">{children}</main>
      </body>
    </html>
  );
}
