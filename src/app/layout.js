import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GlobalSchema from "@/components/SEO/GlobalSchema";


// src/app/layout.jsx
export const metadata = {
  metadataBase: new URL("https://dandesacademy.com"),

  title: {
  default: "AI & Machine Learning Course by Srinivas Dande | Industry-Focused Training | Dandes Academy",
  template: "%s | Dandes Academy",
},

  description:
    "Learn AI & Machine Learning with industry-focused training, hands-on projects, MLOps, and Interview Preparation at Dandes Academy.",
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
          <GlobalSchema />
    

    <Script id="gtm-script" strategy="afterInteractive"
> 
{`
  (function(w,d,s,l,i){w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-W865WG7N');
`}
</Script>

</head>


      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-W865WG7N"
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  </noscript>
        {children}
      </body>
    </html>
  );
}
