"use client";
import Container from "@/components/Layouts/Container";
import Header from "@/components/Layouts/Header";
// import SidebarMenu from "@/components/Layouts/Sidebar/Sidebar";
import {
  SidebarProvider,
  useSidebarContext,
} from "@/components/Layouts/Sidebar/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Footer from "@/components/Layouts/Footer";

const UserLayoutContent: React.FC<React.PropsWithChildren> = function ({
  children,
}) {
  const { isCollapsed } = useSidebarContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // useEffect(() => {
  //   // Add the Tawk.to script to the document
  //   const tawkScript = document.createElement("script");
  //   tawkScript.src = "https://embed.tawk.to/66bb407d0cca4f8a7a755bfd/1i55n7qv2";
  //   tawkScript.charset = "UTF-8";
  //   tawkScript.async = true;
  //   tawkScript.setAttribute("crossorigin", "*");
  //   document.body.appendChild(tawkScript);

  //   // Add custom styles to hide Tawk.to branding
  //   const style = document.createElement("style");
  //   style.innerHTML = `
  //     .tawk-branding {
  //       display: none !important;
  //     }
  //   `;
  //   document.head.appendChild(style);

  //   // Polling function to remove branding elements
  //   const removeBranding = () => {
  //     try {
  //       const iframe = document.querySelector("iframe[title*=chat]:nth-child(2)");
  //       //@ts-ignore
  //       if (iframe && iframe.contentDocument) {
  //         //@ts-ignore
  //         const brandingElement = iframe.contentDocument.querySelector(
  //           "a[class*=tawk-branding]"
  //         );

  //         if (brandingElement) brandingElement.remove();

  //       }
  //     } catch (e) {
  //       // Catch and handle errors silently
  //     }
  //   };

  //   // Set an interval to keep trying to remove the branding
  //   const intervalId = setInterval(removeBranding, 10);

  //   // Cleanup function to remove script, style, and interval
  //   return () => {
  //     document.body.removeChild(tawkScript);
  //     document.head.removeChild(style);
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const isPdfViewer = pathname.startsWith("/reports/pdf-viewer");
  return (
    <>
      <main className="flex items-start min-h-screen bg-white dark:bg-white dark:text-black">
        <Container>
          <div
            id="main-content"
            className={twMerge(
              "relative h-screen w-full overflow-y-auto bg-gray-50 dark:bg-white dark:text-black flex items-start nunito-regular"
              // isCollapsed ? "lg:ml-[4.5rem]" : "lg:ml-64"  
            )}
          >
            {/* {!isPdfViewer && <SidebarMenu isOpen={isOpen} setIsOpen={setIsOpen} />} */}
            <div className={`w-full h-screen overflow-y-auto ${isPdfViewer ? "p-0" : "p-0"
              }`}>
              <Header isOpen={isOpen} setIsOpen={setIsOpen} />
              {children}
              <Footer />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

const Dashboard: React.FC<React.PropsWithChildren> = function ({ children }) {
  return (
    <SidebarProvider>
      <UserLayoutContent>{children}</UserLayoutContent>
    </SidebarProvider>
  );
};

export default Dashboard;
