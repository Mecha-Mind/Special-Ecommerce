import type { Metadata } from "next";
import Navbar from '../components/Navbar'
import "./globals.css";
import { ShopUiProvider } from "@/context/shop-ui-context";
import { CartProvider } from "@/context/cart-context";
import { ToastProvider } from "@/components/toast/ToastProvider";
import SiteFooter from "@/components/Footer";

export const metadata: Metadata = {
  title: "Darl Store",
  description: "best store in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ToastProvider>
          <ShopUiProvider>
            <CartProvider>
              <Navbar />
              {children}

              <SiteFooter/>
            </CartProvider>
          </ShopUiProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
