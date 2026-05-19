"use client";

import React, { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Input,
    useDisclosure,
} from "@heroui/react";

import { Textarea } from "@nextui-org/react";

export const EditIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};
export default function UpdateUserDrawer({ customerData, setIsEdit }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        id: customerData?.id || "",
        first_name: customerData?.customer?.split(" ")[0] || "",
        last_name: customerData?.customer?.split(" ")[1] || "",
        email: customerData?.email || "",
        phone: customerData?.phone || "",
        role: customerData?.role || "",
        account_status: customerData?.accountStatus || "",
        address: customerData?.address || "",
        user_name: customerData?.user_name || "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/users/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            console.log(result);

            if (response.ok) {
                setIsEdit(true)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button
                isIconOnly
                color="default"
                size="md"
                className="ml-1 rounded-lg bg-[#f6f6f6]"
                onPress={onOpen}
            >
                <EditIcon />
            </Button>

            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="right"
                size="lg"
                hideCloseButton
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="border-b">
                                Edit Customer
                            </DrawerHeader>

                            <DrawerBody className="py-6">
                                <div className="grid grid-cols-1 gap-4">

                                    <Field label="First Name">
                                        <Input
                                            name="first_name"
                                            placeholder="Enter First Name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                    </Field>

                                    <Field label="Last Name">
                                        <Input
                                            name="last_name"
                                            placeholder="Enter Last Name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                    </Field>

                                    <Field label="Username">
                                        <Input
                                            name="user_name"
                                            placeholder="Enter Username"
                                            value={formData.user_name}
                                            onChange={handleChange}
                                        />
                                    </Field>

                                    <Field label="Email">
                                        <Input
                                            name="email"
                                            placeholder="Enter Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Field>

                                    <Field label="Phone Number">
                                        <Input
                                            name="phone"
                                            placeholder="Enter Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </Field>

                                    <Field label="Address">
                                        <Textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter Address"
                                        />
                                    </Field>
                                </div>
                            </DrawerBody>

                            <DrawerFooter className="border-t">
                                <Button
                                    variant="bordered"
                                    onPress={onClose}
                                    className="border-gray-300"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    color="primary"
                                    onPress={() => {
                                        handleUpdate();
                                        onClose();
                                    }}
                                >
                                    Update Customer
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}

/* Field Wrapper */
const Field = ({ label, children }: any) => (
    <div>
        <label className="text-sm font-medium pl-2">{label}</label>
        <div className="mt-2">{children}</div>
    </div>
);