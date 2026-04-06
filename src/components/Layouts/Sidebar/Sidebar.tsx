"use client";

import { Sidebar } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { sidebarMenu } from "@/constants/sidebarMenu";

const SidebarMenu = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}) => {
    const path = usePathname();
    const router = useRouter();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const handleNavigate = (url: string) => {
        router.push(url);
    };

    // ✅ Detect active submenu
    const isSubMenuActive = (subMenu: any[]): boolean => {
        return subMenu.some((item) => {
            if (item.subMenu) return isSubMenuActive(item.subMenu);
            return path === item.route || path.startsWith(item.route + "/");
        });
    };

    // ✅ Render Menu Items
    const renderSidebarItems = (items: any[]) => {
        return items.map((item) => {
            // 👉 WITH SUBMENU
            if (item.subMenu) {
                return (
                    <Sidebar.Collapse
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        open={openMenus[item.label] ?? isSubMenuActive(item.subMenu)}
                        onClick={() =>
                            setOpenMenus((prev) => ({
                                ...prev,
                                [item.label]: !prev[item.label],
                            }))
                        }
                    >
                        {renderSidebarItems(item.subMenu)}
                    </Sidebar.Collapse>
                );
            }

            // 👉 NORMAL ITEM
            return (
                <Sidebar.Item
                    key={item.label}
                    active={path === item.route}
                    as={Link}
                    href={item.route}
                    icon={item.icon}
                    className={
                        path === item.route
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                    }
                >
                    {item.label}
                </Sidebar.Item>
            );
        });
    };

    return (
        <div className="flex h-screen">
            {/* SIDEBAR */}
            <Sidebar className={`${isOpen ? "block" : "hidden"} w-64`}>
                {/* LOGO */}
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item onClick={() => handleNavigate("/")}>
                            <div className="flex items-center justify-between w-full">
                                {/* Left */}
                                <span className="font-bold tracking-wide">DITTU</span>

                                {/* Right */}
                                <span className="text-sm opacity-60">→</span>
                            </div>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>

                    {/* ✅ IMPORTANT: wrap menu inside ItemGroup */}
                    <Sidebar.ItemGroup>
                        {renderSidebarItems(sidebarMenu)}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            {/* TOGGLE BUTTON */}
            <div
                className="mt-32 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <Tooltip content="Hide menu">
                        <div className="bg-white p-2 shadow rounded-r">
                            <FaAnglesLeft />
                        </div>
                    </Tooltip>
                ) : (
                    <Tooltip content="Show menu">
                        <div className="bg-white p-2 shadow rounded-r">
                            <FaAnglesRight />
                        </div>
                    </Tooltip>
                )}
            </div>
        </div>
    );
};

export default SidebarMenu;