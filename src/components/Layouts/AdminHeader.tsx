"use client";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";

import { TbMessage2 } from "react-icons/tb";
import { FiBell } from "react-icons/fi";

import { signOut } from "next-auth/react";
import { useStore } from "@/lib/zustand/store";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { getBrowserName, getClientIP } from "@/helpers/clientIP";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const AdminHeader = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) => {
    const router = useRouter();


    const { data: session } = useSession();
    const email = session?.user.email;

    const profileText = `${session?.user?.first_name?.[0] ?? ""}${session?.user?.last_name?.[0] ?? ""}`.toUpperCase();

    const [userDetails, setUserDetails] = useState<any>({});
    const [hasOpenedNotifications, setHasOpenedNotifications] = useState(false);



    const { userLogout } = useStore((s) => s);

    const handleLogout = async () => {


        // Perform sign out manually and then redirect using router
        await signOut({ redirect: false }); // prevent auto redirect
        userLogout(); // custom cleanup
    };



    return (
        <>
            <div className="flex justify-between items-center w-full mb-3">
                {/* <SearchInput /> */}
                <div></div>
                <div className="flex items-center float-right">
                    {/* <Button
            isIconOnly
            color="default"
            aria-label="Like"
            size="lg"
            className="mr-5 rounded-full bg-white hidden lg:block p-3.5"
          >
            <AiOutlineExclamationCircle className="text-xl" />
          </Button> */}
                    <Button
                        isIconOnly
                        aria-label="Like"
                        size="lg"
                        className="mr-5 rounded-full  bg-white hidden lg:block p-3.5"
                    // onClick={handleChatOpen}
                    >
                        <TbMessage2 className="text-xl" />
                    </Button>
                    <Dropdown placement="bottom-end" >
                        <DropdownTrigger>
                            <div className="relative flex items-center">
                                <div className="mr-5 hidden lg:block bg-white p-3.5 rounded-full shadow cursor-pointer">
                                    <FiBell className="text-xl text-gray-800" />
                                    {Array.isArray(userDetails?.notification_message) &&
                                        userDetails.notification_message.some(
                                            (msg: any) => msg && msg.notification_read === false
                                        ) && (
                                            <span className="absolute top-0 right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {
                                                    userDetails.notification_message.filter(
                                                        (msg: any) =>
                                                            msg &&
                                                            Object.keys(msg).length > 0 &&
                                                            msg.notification_read === false
                                                    ).length
                                                }
                                            </span>
                                        )}
                                </div>
                            </div>
                        </DropdownTrigger>

                        <DropdownMenu
                            aria-label="Notifications"
                            variant="flat"
                            className="w-[395px] max-h-[400px] overflow-y-auto"
                        >
                            <DropdownItem
                                key="notification-header"
                                className="sticky top-0 bg-white z-10 py-3 border-b border-gray-200"
                            >
                                <p className="text-lg font-bold">Notifications</p>
                            </DropdownItem>

                            {Array.isArray(userDetails?.notification_message) &&
                                userDetails.notification_message.filter(
                                    (msg: any) => msg && Object.keys(msg).length > 0
                                ).length > 0 ? (
                                userDetails.notification_message
                                    .filter((msg: any) => msg && Object.keys(msg).length > 0)
                                    .map(
                                        (
                                            item: { notification: string; created_on: string },
                                            index: number
                                        ) => (
                                            <DropdownItem
                                                key={`notification-item-${index}`}
                                                className="h-auto gap-2 p-3 bg-[#f6f6f6] hover:bg-gray-100 transition-all"
                                                style={{ width: "100%" }}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-gray-500">
                                                        👋{dayjs(item.created_on).format("DD-MM-YYYY hh:mm A")}
                                                    </span>
                                                    {item.notification && (
                                                        <IoClose
                                                            className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                                                            // onClick={handleClear}
                                                            size={16}
                                                        />
                                                    )}
                                                </div>
                                                <p className="text-sm text-black whitespace-normal break-words leading-snug">
                                                    {item.notification}
                                                </p>
                                            </DropdownItem>
                                        )
                                    )
                            ) : (
                                <DropdownItem
                                    key="no_notifications"
                                    className="h-auto gap-2 p-4 bg-f6f6f6 cursor-default"
                                    style={{ width: "100%" }}
                                >
                                    <p className="text-sm text-gray-500 text-center cursor-default">
                                        There are no notifications
                                    </p>
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <div className="flex items-center cursor-pointer">
                                <Avatar
                                    src={userDetails?.profile_image}
                                    size="lg"
                                    // className="mr-2 cursor-pointer"
                                    fallback={profileText.toUpperCase()}
                                    className="text-large font-bold text-blue-600 bg-blue-100 flex items-center justify-center rounded-full"
                                />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold nunito-bold">Signed in as</p>
                                <p className="font-semibold nunito-bold">{email}</p>
                            </DropdownItem>

                            <DropdownItem key="message-items" className="h-14 gap-1 md:block lg:hidden">
                                <span className="flex items-center gap-2 ">
                                    <TbMessage2 className="text-xl nunito-semibold" />
                                    <p className="text-[15px] ">Message</p>
                                </span>
                            </DropdownItem>
                            <DropdownItem key="notification" className="h-14 gap-2 md:block  lg:hidden ">
                                <span className="flex items-center gap-2 ">
                                    <FiBell className="text-xl nunito-semibold" />
                                    <p className="text-[15px] ">Notification</p>
                                </span>
                            </DropdownItem>
                            <DropdownItem key="user-setting">
                                <p className="text-[15px] nunito-semibold">
                                    <Link href={"/login/user-setting"}>My Account</Link>
                                </p>
                            </DropdownItem>
                            <DropdownItem key="change-password">
                                <p className="text-[15px] nunito-semibold">
                                    <Link href={"/login/user-setting?tab=password"}>
                                        Change Password
                                    </Link>
                                </p>
                            </DropdownItem>
                            <DropdownItem key="logout" onClick={handleLogout}>
                                <p className="text-[15px] danger nunito-semibold">Log Out</p>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default AdminHeader;
