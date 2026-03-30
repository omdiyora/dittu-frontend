import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@heroui/react";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function HomeHeader() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <>
            <header className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4 text-sm text-black bg-white/80 backdrop-blur">

                {/* LEFT */}
                <div className="flex gap-6">
                    <a href="/homepage" className="text-xs font-medium tracking-widest uppercase text-[#1a1a1a] hover:opacity-60 transition-opacity">HOME</a>
                    <span className="cursor-pointer">PRESETS ▾</span>
                    <span className="cursor-pointer">SHOP ▾</span>
                </div>

                {/* CENTER LOGO */}
                <div className="font-serif text-lg tracking-widest">
                    Dittuss
                </div>

                {/* RIGHT */}
                <div className="flex gap-6">
                    <span>COLLECTIONS ▾</span>
                    <span>PAGES ▾</span>
                    <span>🔍</span>
                    <span>👤</span>
                    <span>🛒</span>
                </div>
            </header>
        </>
    );
}

