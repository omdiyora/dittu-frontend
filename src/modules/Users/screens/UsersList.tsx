"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/zustand/store";
import { FaPlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/react";
import dayjs from "dayjs";
import { Select, SelectItem } from "@nextui-org/react";

export const EyeIcon = (props: any) => {
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
                d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const DeleteIcon = (props: any) => {
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
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const PlusIcon = ({
    size = 24,
    width,
    height = 24,
    ...props
}: {
    size?: number;
    width?: number;
    height?: number;
}) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};

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

const UsersList: React.FC<any> = ({ params }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const getUser = useStore((s) => s.getUser);
    const userAccountsData = useStore((s) => s.userData);
    const deleteAccounts = useStore((s) => s.deleteReport);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50); // Default to 10 items per page
    const [selectedSearch, setSelectedSearch] = useState<any>({
        selectModuleType: "All",
        selectStatus: 'All'
    });


    const handleUserEdit = (risk: any) => {
        const edit = `edit`;
        router.push(`/manage/user/${edit}/${risk?.id}`);
    };

    const handleUserView = async (risk: any) => {
        const edit = `view`;
        router.push(`/manage/user/${edit}/${risk?.id}`);

    };

    const handleUserDelete = async (data: any) => {
        Swal.fire({
            title: "Are you sure you want to delete this item?",
            showCancelButton: true,
            confirmButtonColor: "#0070f0",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm Delete",
            cancelButtonText: "Cancel",
            customClass: {
                title: "swal2-title",
                popup: "swal2-popup",
                confirmButton: "swal2-confirm-button",
                cancelButton: "swal2-cancel-button",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                let response: any;
                response = await deleteAccounts(data.id);
                const recordId = response?.data?.id || data.id; // or whatever identifies the record

                if ((response as any).status === 200) {
                    getUser();
                }
            }
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    // Calculate the total pages
    const totalPages = Math.ceil(userAccountsData?.length / itemsPerPage);


    // Get the paginated data
    const paginatedData = userAccountsData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const fullModuleType = [
        {
            "id": 'All',
            "name": "All"
        },
        {
            "id": "Admin",
            "name": "Admin"
        },
        {
            "id": "Manager",
            "name": "Manager"
        },
        {
            "id": "Analyst",
            "name": "Analyst"
        }
    ];

    const accountStauts = [
        {
            id: "All",
            name: "All"
        },
        {
            id: "Active",
            name: "Active"
        },
        {
            id: "Inactive",
            name: "Inactive"
        },
    ]

    const handleChangeSearch = (field: any, value: any) => {
        setSelectedSearch((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };


    const filteredDetails = paginatedData?.filter((e: any) => {

        const moduleType = selectedSearch.selectModuleType;

        const statusMatch =
            selectedSearch.selectStatus === "All" ||
            e.account_status === selectedSearch.selectStatus;

        const moduleMatch =
            moduleType === "All" ||
            e.role === moduleType;

        return moduleMatch && statusMatch;
    });

    return (
        <>
            <div className="flex h-[70vh] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-3xl text-black">Access Denied</span>
                </div>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg flex-1 w-full">
                <div className="flex justify-between items-center h-20 rounded-md">
                    <div className="font-bold nunito-bold ml-2 text-[22px]">User Accounts</div>
                    <button
                        onClick={() => router.push(`/manage/user/create`)}
                        className="border bg-transparent border-[#54221c] rounded-md w-fit h-12 px-5 text-lg font-bold nunito-bold flex items-center justify-around text-[#54221c]"
                    >
                        <FaPlus className="mr-2" /> Create a new account
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="ml-4 w-72">
                        <div className="text-sm mb-2 font-semibold">
                            Select Role Type
                            <Select
                                variant="bordered"
                                name="selectAssessment"
                                size={"md"}
                                className="w-full mt-2"
                                onChange={(e) =>
                                    handleChangeSearch("selectModuleType", e.target.value)
                                }
                                defaultSelectedKeys={["All"]}
                            >
                                {
                                    fullModuleType?.map(
                                        (e: any) => (
                                            <SelectItem
                                                key={e.name}
                                                value={e.name}
                                                className="nunito-regular"
                                            >
                                                {e.name}
                                            </SelectItem>
                                        )
                                    ) as any
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="ml-4 w-72">
                        <div className="text-sm mb-2 font-semibold">
                            Select Account Status
                            <Select
                                variant="bordered"
                                name="selectStatus"
                                size="md"
                                className="w-full mt-2"
                                onChange={(e) => handleChangeSearch("selectStatus", e.target.value)}
                                defaultSelectedKeys={["All"]}
                            >
                                {accountStauts.map((e) => (
                                    <SelectItem key={e.id} value={e.name} className="nunito-regular">
                                        {e.name}
                                    </SelectItem>
                                ))}
                            </Select>

                        </div>
                    </div>
                </div>
                <div className="w-full overflow-x-auto mt-4">
                    <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
                        <thead>
                            <tr className="bg-gray-100 text-left text-black text-base">
                                <th className="p-4">User</th>
                                <th className="p-4">User Name</th>
                                <th className="p-4">Roles</th>
                                <th className="p-4">Account Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDetails?.length > 0 ? (
                                filteredDetails?.map((e: any, index: number) => {
                                    const loginTime = e?.user_activity?.[0]?.login_time
                                        ? dayjs(e.user_activity[0].login_time).format("DD-MM-YYYY hh:mm A")
                                        : "N/A";

                                    return (
                                        <tr
                                            key={index}
                                            className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
                                            onDoubleClick={() => handleUserEdit(e)}
                                        >
                                            <td className="p-4 align-top">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 shrink-0">
                                                        <Avatar
                                                            size="md"
                                                            src={e.profile_image}
                                                            fallback={`${e?.first_name[0] ?? ""}${e?.last_name[0] ?? ""
                                                                }`.toUpperCase()}
                                                            className="w-10 h-10 text-large font-bold text-blue-600 bg-blue-100 flex items-center justify-center rounded-full"
                                                        />
                                                        <span
                                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${e?.user_activity?.[0]?.login_status === "Active" ? "bg-green-500" : "bg-red-500"
                                                                }`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-black">
                                                            {e.first_name} {e.last_name}
                                                        </div>
                                                        <div className="text-base text-black">{e.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-base text-black align-top">{e.user_name}</td>
                                            <td className="p-4 text-base text-black align-top">{e.role}</td>
                                            <td className="p-4 text-base align-top">
                                                <div className="text-sm text-black mt-1">{e.account_status}</div>
                                            </td>
                                            <td className="p-4 text-center align-top">
                                                <div className="flex items-center justify-center gap-3">
                                                    <Tooltip content="Details">
                                                        <button onClick={() => handleUserView(e)}>
                                                            <EyeIcon className="text-black hover:text-blue-600 transition-colors" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip content="Edit user">
                                                        <button onClick={() => handleUserEdit(e)}>
                                                            <EditIcon className="text-black hover:text-green-600 transition-colors" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip color="danger" content="Delete user">
                                                        <button onClick={() => handleUserDelete(e)}>
                                                            <DeleteIcon className="text-red-600 hover:text-red-800 transition-colors" />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-4 text-black">
                                        No records found
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div >
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="mr-2 px-4 py-2 border rounded-md text-black disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="mr-2">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="px-4 py-2 border rounded-md text-black disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="flex justify-between items-center my-4">
                        <span className="text-black mr-2 ">Show:</span>
                        <select
                            className="border rounded-md px-2 py-1"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1); // Reset to first page on change
                            }}
                        >
                            {[10, 20, 30, 40, 50, 100].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div >
        </>
    );
};

export default UsersList;
