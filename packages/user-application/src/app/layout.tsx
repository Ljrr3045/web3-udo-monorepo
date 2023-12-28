import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/feautures/Layout/Header";
import { Footer } from "@/feautures/Layout/Footer";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "University of Oriente - UDOT",
  description: "Web3 Dapp of the University of Oriente - UDOT",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={`w-full h-screen flex flex-col items-center justify-between ${inter.className}`}>
          <Header />
            {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
