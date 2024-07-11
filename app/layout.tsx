import "../app/globals.css"
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Lyriclink',
  description: '.',
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
