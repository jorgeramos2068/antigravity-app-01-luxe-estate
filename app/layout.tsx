import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luxe Estate | Premium Real Estate',
  description: 'Find your sanctuary.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-nordic-dark dark:text-white font-display selection:bg-mosque selection:text-white min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
