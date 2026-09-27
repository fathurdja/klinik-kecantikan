import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./AppShell";

export const metadata: Metadata = {
  title: "GlowCare ERP — Sistem Manajemen Klinik Kecantikan",
  description: "Sistem ERP terintegrasi untuk klinik kecantikan. Manajemen appointment, pasien, POS, inventori, komisi, dan keuangan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
