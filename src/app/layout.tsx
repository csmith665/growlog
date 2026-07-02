import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Growlog - Plant Management & Garden Tracking',
  description: 'Plan gardens, track plant growth, and manage care schedules. Database of plants with accurate growing information.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <a href="/" className="nav-brand">Growlog</a>
          <div className="nav-links">
            <a href="/database">Plant Database</a>
            <a href="/garden">My Garden</a>
            <a href="/tracking">Tracking</a>
            <a href="/guides">Guides</a>
          </div>
        </nav>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
