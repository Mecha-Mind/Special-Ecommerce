import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from '../components/Navbar'
import "./globals.css";
import { ShopUiProvider } from "@/context/shop-ui-context";
import { CartProvider } from "@/context/cart-context";
import { ToastProvider } from "@/components/toast/ToastProvider";
import SiteFooter from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Darl Store",
  description: "Clothing, shoes, and accessories demo store (EGP).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body
        className={`${dmSans.className} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ToastProvider>
          <ShopUiProvider>
            <CartProvider>
              <Navbar />
              <main className='flex-1 mx-auto max-w-6xl px-4 py-6'>
                {children}
              </main>

              <SiteFooter/>
            </CartProvider>
          </ShopUiProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
