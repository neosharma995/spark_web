import "./globals.css";
import "./style/global.scss";
import Layout from "./_common/layout";
import { SectorDataProvider } from "../context/apiContext";
import { ThemeProvider } from "@/context/ThemeContext";

import { Toaster } from "sonner";
export default function RootLayout({ children }) {
  return (
    <html lang="en">


      <head>
        <title>Spark Web Solution</title>
        {/* ✅ Favicon/logo added here */}
        <link rel="icon"href="/favicon.ico" />


        {/* Optional: JSON-LD for Google logo detection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Spark Web Solution",
              url: "https://sparkweb.co.in",
             logo: "https://sparkweb.co.in/siteLogo/logo.jpg"
            }),
          }}
        />
      </head>


      <body>
        <ThemeProvider>
          <Toaster position="top-right" />
          <SectorDataProvider>
            <Layout>{children}</Layout>
          </SectorDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
