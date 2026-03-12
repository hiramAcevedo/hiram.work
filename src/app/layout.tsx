import type { Metadata } from "next";
import { Rajdhani, IBM_Plex_Sans, JetBrains_Mono, Libre_Bodoni } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-libre-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hiram Acevedo — Fullstack Developer | AI & LLM Integration",
  description:
    "Fullstack Developer with 21+ projects. Next.js, Python/FastAPI, Java/Spring Boot. AI integration, local LLMs. Based in Mexico, open to remote.",
  metadataBase: new URL("https://hiram.work"),
  openGraph: {
    title: "Hiram Acevedo — Fullstack Developer | AI & LLM Integration",
    description:
      "Fullstack Developer with 21+ projects. Next.js, Python/FastAPI, Java/Spring Boot. AI integration, local LLMs.",
    url: "https://hiram.work",
    siteName: "Hiram Acevedo",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${rajdhani.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} ${libreBodoni.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
