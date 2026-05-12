import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabrina's Opening Act",
  description: "A global search for the next pop star.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <main className="site-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
