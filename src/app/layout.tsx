import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { FirebaseConfigBanner } from "@/components/FirebaseConfigBanner";

export const metadata: Metadata = {
  title: "AnaliseRoyale - Análise de Decks Clash Royale",
  description: "Analise seu deck e aumente suas vitórias com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-inter antialiased">
        <FirebaseConfigBanner />
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
