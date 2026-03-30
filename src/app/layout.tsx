"use client";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import "@/styles/globals.css";
import { flowbiteTheme } from "@/styles/flowbit-theme";
import { AuthProvider } from "@/lib/Providers";
import PageWrapper from "@/components/PageWrapper";
import SnackbarProviderWrapper from "@/components/SnackbarProviderWrapper";

const theme = { theme: flowbiteTheme };

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          // @ts-ignore
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
      </head>

      <body className={twMerge("bg-gray-50 dark:bg-gray-900 font-nunito")}>
        <PageWrapper>
          <AuthProvider>
            {/* @ts-ignore */}
            <SnackbarProviderWrapper>
              <Flowbite theme={theme}>{children}</Flowbite>
            </SnackbarProviderWrapper>
          </AuthProvider>
        </PageWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
