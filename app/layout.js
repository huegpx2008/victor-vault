import './globals.css';

export const metadata = {
  title: 'Victor Archive Prop Interface',
  description: 'Cinematic fake encrypted access interface for film production.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
