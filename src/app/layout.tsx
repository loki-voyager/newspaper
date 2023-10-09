import { Header } from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import BG from "./img/BG.jpg";

export const metadata: Metadata = {
  title: 'Newspaper',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"style={{
      backgroundImage: `url(${BG.src})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}>
      <body>
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  )
}
