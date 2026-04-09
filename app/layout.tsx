import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SupportChat } from '@/components/chat/SupportChat'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Real Estate - منصة العقارات الذكية | بيع وإيجار العقارات',
  description: 'منصة عقارات رائدة لشراء وبيع وإيجار شقق وفيلات وأراضي. ابحث عن عقارك المثالي مع أفضل الأسعار والخدمات الموثوقة.',
  generator: 'Real Estate Platform',
  keywords: 'عقارات، شقق، فيلات، أراضي، بيع، إيجار، القاهرة، الإسكندرية، Real Estate',
  icons: {
    icon: [
      {
        url: '/logo.png',
        type: 'image/png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Real Estate - منصة العقارات الذكية',
    description: 'اعثر على عقارك المثالي بسهولة - تواصل معنا: +20 128 137 8331',
    type: 'website',
    locale: 'ar_EG',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased">
        {children}
        <SupportChat />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
