import "./globals.css";
import "./style/global.scss";
import Layout from "./_common/layout";
import { SectorDataProvider } from "../context/apiContext";
import { Toaster } from 'sonner';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position='top-right' />
        <SectorDataProvider>
          <Layout>{children}</Layout>
        </SectorDataProvider>
      </body>
    </html>
  );
}
