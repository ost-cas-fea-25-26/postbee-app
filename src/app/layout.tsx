import { Header } from '@/components/header/Header';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

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
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            closeButton: true,
          }}
        />
        <Header />
        <main className="flex flex-col items-center justify-center px-sm">
          <div className="w-full max-w-content py-lg">{children}</div>
        </main>
      </body>
    </html>
  );
}
