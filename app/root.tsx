import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { Analytics } from '@vercel/analytics/remix';
import { SpeedInsights } from '@vercel/speed-insights/remix';
// import { ContextProviders } from './components/ContextProviders';

import './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full overflow-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Cool Guitar Tools</title>
        <meta name="description" content="The best directory of guitar tools and learning resources" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://coolguitar.tools" />
        <meta property="og:title" content="Cool Guitar Tools" />
        <meta
          property="og:description"
          content="The best directory of guitar tools and learning resources"
        />
        <meta property="og:image" content="/assets/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://coolguitar.tools" />
        <meta name="twitter:title" content="Cool Guitar Tools" />
        <meta
          name="twitter:description"
          content="The best directory of guitar tools and learning resources"
        />
        <meta name="twitter:image" content="/assets/og-image.png" />

        <Meta />
        <Links />
        <style
          // disable overscroll
          dangerouslySetInnerHTML={{
            __html: `
          html, body {
            overscroll-behavior: none;
            overflow: hidden;
            height: 100%;
            position: fixed;
            width: 100%;
          }
          #root {
            overflow: auto;
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
          }
        `,
          }}
        />
      </head>
      <body className="bg-background">
        <div id="root" className="bg-background">
          {/* <ContextProviders>{children}</ContextProviders> */}
          {children}
          <ScrollRestoration />
          <Scripts />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
