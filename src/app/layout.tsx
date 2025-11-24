import Header from '@/components/header/Header';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'PostBee Mumble',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-secondary-100">
        <Header />
        <main className="flex flex-col items-center justify-center px-sm">
          <div className="w-full max-w-content mt-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
