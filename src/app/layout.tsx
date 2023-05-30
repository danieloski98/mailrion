import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './provider'
import { Metadata } from 'next'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mailrion',
  description: 'Your own customzied workspace',
  icons: {
    icon: '/images/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.png',
    },
  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
