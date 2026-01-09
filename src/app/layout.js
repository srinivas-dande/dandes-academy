import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";


// src/app/layout.jsx
export const metadata = {
  metadataBase: new URL("https://dandesacademy.com"),
  title: {
    default: "Dandes Academy | AI/ML Training | Srinivas Dande",
    template: "%s | Dandes Academy",
  },
  description:
    "Industry-focused AI/ML training with hands-on projects, deployment (MLOps), and interview preparation.",
  applicationName: "Dandes Academy",
  keywords: [
    "AI ML course",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Generative AI",
    "Agentic AI",
    "LLM",
    "MLOps",
    "AI training Bangalore",
    "Dandes Academy",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Dandes Academy",
    title: "Dandes Academy | AI/ML Training",
    description:
      "Industry-focused AI/ML training with hands-on projects, deployment (MLOps), and interview preparation.",
    url: "https://dandesacademy.com",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dandes Academy AI/ML Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dandes Academy | AI/ML Training",
    description:
      "Industry-focused AI/ML training with hands-on projects, deployment (MLOps), and interview preparation.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
    {/* Google Analytics */}
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-XVJ1MY6LEQ"
      strategy="afterInteractive"
    />
    <Script id="ga4-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XVJ1MY6LEQ');
      `}
    </Script>
</head>


      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
