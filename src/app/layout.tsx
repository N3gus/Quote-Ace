import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Logo } from '@/components/logo';

/**
 * Metadata for the application, used for SEO and browser information.
 */
export const metadata: Metadata = {
  title: 'Quote Ace',
  description: 'Get a motor insurance quotation in minutes.',
};

/**
 * The root layout for the entire application.
 * This component wraps all pages and provides a consistent structure,
 * including the header, footer, and font loading.
 * @param {Readonly<{ children: React.ReactNode }>} props - The props for the component.
 * @returns {React.ReactElement} The rendered root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <div className="flex flex-col min-h-screen">
          <header className="py-4 px-4 sm:px-6 md:px-8 border-b bg-card">
            <div className="container mx-auto">
              <Link href="/" className="flex items-center gap-2 w-fit">
                <Logo />
                <span className="font-bold text-xl text-primary">Quote Ace</span>
              </Link>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="text-center p-4 text-sm text-muted-foreground">
            © 2025 n k e t a n i.
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
