import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Serif_JP } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://wagasa.jp"),
  title: "Wagasa | A Poem for the Sky",
  description: "Reawakening ancient Japanese umbrella craftsmanship through pigment, paper, and poetic movement",
  applicationName: "Wagasa",
  authors: [{ name: "Wagasa Atelier" }],
  creator: "Wagasa Atelier",
  publisher: "Wagasa Atelier",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    title: "Wagasa | A Poem for the Sky",
    description: "An immersive horizontal story about Japanese wagasa craftsmanship.",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSerifJp.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
