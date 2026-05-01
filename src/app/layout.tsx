"use client";

import { Flowbite, ThemeModeScript } from "flowbite-react";
import { twMerge } from "tailwind-merge";
// @ts-ignore
import "@/styles/globals.css";
import { flowbiteTheme } from "@/styles/flowbit-theme";
import { AuthProvider } from "@/lib/Providers";
import PageWrapper from "@/components/PageWrapper";
import SnackbarProviderWrapper from "@/components/SnackbarProviderWrapper";
import { CartProvider } from "@/context/CartContext";
import { DM_Sans } from "next/font/google"; // ✅ ADD

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body-family",
});

const theme = { theme: flowbiteTheme };

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <ThemeModeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
      </head>

      <body
        className={twMerge(
          "bg-gray-50 dark:bg-gray-900 font-body"
        )}
      >
        <PageWrapper>
          <AuthProvider>
            <CartProvider>
              {/* @ts-ignore */}
              <SnackbarProviderWrapper>
                <Flowbite theme={theme}>{children}</Flowbite>
              </SnackbarProviderWrapper>
            </CartProvider>
          </AuthProvider>
        </PageWrapper>
      </body>
    </html>
  );
};

export default RootLayout;