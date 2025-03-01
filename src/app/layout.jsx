import "./globals.css";
import "./style/global.scss";
import Layout from "./_common/layout";
import { SectorDataProvider } from "../context/apiContext";
import { ThemeProvider } from "@/context/ThemeContext";

import { Toaster } from "sonner";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
