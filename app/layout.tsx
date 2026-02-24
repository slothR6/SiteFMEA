import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/Footer";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FMEA Engineering | Engenharia aplicada para decisões estratégicas",
  description:
    "Empresa brasileira especializada em inspeções técnicas, análise de falhas e desenvolvimento de projetos para energia renovável.",
  keywords: ["FMEA Engineering", "engenharia aplicada", "análise de falhas", "inspeções técnicas", "energia renovável"],
  metadataBase: new URL("https://fmea-engineering.vercel.app"),
  openGraph: {
    title: "FMEA Engineering",
    description: "Decisões técnicas orientadas por evidências para ativos críticos.",
    url: "https://fmea-engineering.vercel.app",
    siteName: "FMEA Engineering",
    type: "website",
    locale: "pt_BR"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
