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
import SidebarMenu from "@/components/Layouts/Sidebar/Sidebar";
import AdminHeader from "@/components/Layouts/AdminHeader";
// import "flowbite/dist/flowbite.css";
const DashboardLayoutContent: React.FC<React.PropsWithChildren> = function ({
  children,
}) {
  const { isCollapsed } = useSidebarContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  

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
            {/* @ts-ignore */}
            {!isPdfViewer && <SidebarMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
            <div className={`w-full h-screen overflow-y-auto ${isPdfViewer ? "p-0" : "p-5"
              }`}>
              {/* <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} /> */}
              {children}
              {/* <Footer /> */}
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
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
};

export default Dashboard;
