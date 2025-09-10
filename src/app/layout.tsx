import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  Inter,
  Source_Serif_4,
  JetBrains_Mono,
  Montserrat,
} from "next/font/google";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Registry Starter",
  description: "Starter to help build a Shadcn Registry using Tailwind v4",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

const InterSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const SourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-mono",
});

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        InterSans.variable,
        SourceSerif.variable,
        JetBrainsMono.variable,
        "bg-background text-foreground"
      )}
    >
      <meta
        name="robots"
        content="noindex, nofollow, noarchive, nosnippet, noimageindex"
      />
      <body className="flex grow">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
