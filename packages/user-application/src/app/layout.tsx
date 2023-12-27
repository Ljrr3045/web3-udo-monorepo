import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
