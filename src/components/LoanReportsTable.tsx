import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/tablebutton";
import clsx from "clsx";
import {
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownSection
} from "@heroui/react";

export interface ReportData {
    id: number;
    report_date: string;
    name: string;
    type_loan: string;
    branch: string;
    yes_no: string;
    flat_no: string;
    project: string;
    rdlp_date: string;
    rdlp_no: string;
    sanction: string;
    s_date: string;
    bank: string;
    loan_ac: string;
    saving_ac: string;
    m_date: string;
    dsa: string;
    tcr: string;
    valuation: string;
    s_no: string;
    d1_date: string;
    d1: string;
    d2_date: string;
    d2: string;
    d3_date: string;
    d3: string;
    ref: string;
    business: string;
    notes: string;
    info: string;
    mobile: string;
    rday: number | null;
    sday: number | null;
    mday: number | null;
    created_at: string;
    created_by: string | null;
    updated_at: string | null;
    updated_by: string | null;
}

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }: any) => {
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
            <path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="currentColor"
            />
        </svg>
    );
};

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

const columns = [
    { key: "id", label: "ID" },
    { key: "report_date", label: "Report Date" },
    { key: "name", label: "Name" },
    { key: "type_loan", label: "Loan Type" },
    { key: "branch", label: "Branch" },
    { key: "yes_no", label: "Yes/No" },
    { key: "flat_no", label: "Flat No" },
    { key: "project", label: "Project" },
    { key: "rdlp_date", label: "RDLP Date" },
    { key: "rdlp_no", label: "RDLP No" },
    { key: "sanction", label: "Sanction" },
    { key: "s_date", label: "S Date" },
    { key: "bank", label: "Bank" },
    { key: "loan_ac", label: "Loan A/C" },
    { key: "saving_ac", label: "Saving A/C" },
    { key: "m_date", label: "M Date" },
    { key: "dsa", label: "DSA" },
    { key: "tcr", label: "TCR" },
    { key: "valuation", label: "Valuation" },
    { key: "s_no", label: "S No" },
    { key: "d1_date", label: "D1 Date" },
    { key: "d1", label: "D1" },
    { key: "d2_date", label: "D2 Date" },
    { key: "d2", label: "D2" },
    { key: "d3_date", label: "D3 Date" },
    { key: "d3", label: "D3" },
    { key: "ref", label: "Reference" },
    { key: "business", label: "Business" },
    { key: "notes", label: "Notes" },
    { key: "info", label: "Info" },
    { key: "mobile", label: "Mobile" },
    { key: "rday", label: "R Day" },
    { key: "sday", label: "S Day" },
    { key: "mday", label: "M Day" },
    { key: "created_at", label: "Created At" },
    { key: "created_by", label: "Created By" },
    { key: "updated_at", label: "Updated At" },
    { key: "updated_by", label: "Updated By" },
];

const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return dateString || "-";
    }
};

const formatCellValue = (key: string, value: unknown): string => {
    if (value === null || value === undefined || value === "") return "-";

    if (key.includes("date") || key === "created_at" || key === "updated_at") {
        return formatDate(value as string);
    }

    return String(value);
};

type LoanReportsTableProps = {
    data: any[];
    onView?: (id: number | string) => void;
    onEdit?: (id: number | string) => void;
    onDelete?: (id: number | string) => void;
};

const LoanReportsTable = ({
    data,
    onView,
    onEdit,
    onDelete,
}: LoanReportsTableProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);


    // ---------------- ROW COLOR ----------------
    const getRowClass = (row: any) => {
        const r = Number(row.rday || row.Rday || 0);
        const s = Number(row.sday || row.Sday || 0);
        const m = Number(row.mday || row.Mday || 0);

        if (r > 0) return "bg-red-100 text-red-900";
        if (s > 0) return "bg-orange-100 text-orange-900";
        if (m > 0) return "bg-blue-100 text-blue-900";

        return "bg-green-50";
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full">
            {/* Scroll Navigation Buttons */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                <Button
                    variant="scroll"
                    size="icon"
                    onClick={scrollLeft}
                    className="shadow-lg"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                <Button
                    variant="scroll"
                    size="icon"
                    onClick={scrollRight}
                    className="shadow-lg"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Table Container */}
            <div
                ref={scrollContainerRef}
                className="mx-8 overflow-x-auto overflow-y-auto rounded-lg border border-table-border bg-card shadow-sm scroll-smooth"
                style={{ maxHeight: "calc(100vh - 200px)" }}
            >
                <table className="w-full border-collapse">
                    {/* Sticky Header */}
                    <thead className="sticky top-0 z-10 bg-table-header shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.08)] bg-[#f0f6ff]">
                        <tr>
                            <th className="bg-[#f0f6ff] sticky left-0 z-20 whitespace-nowrap border-b border-table-border bg-table-header px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                ID
                            </th>
                            <th className="bg-[#f0f6ff] sticky left-[48px] z-20 whitespace-nowrap border-b border-table-border bg-table-header px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Name
                            </th>
                            {columns.filter(
                                (column) =>
                                    !["id", "name"].includes(column.key)
                            ).map((column, colIndex) => {
                                return (
                                    <th
                                        key={column.key}
                                        className={`z-50 whitespace-nowrap border-b border-table-border px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                            }`}
                                    >
                                        {column.label}
                                    </th>
                                );
                            })}
                            <th className="bg-[#f0f6ff] sticky right-0 z-20 whitespace-nowrap border-b border-table-border bg-table-header px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody >
                        {data.map((row, index) => (
                            <tr
                                key={row.id}
                                className={clsx(
                                    "cursor-pointer transition-all duration-200 ease-out hover:bg-table-row-hover",
                                    index % 2 === 0 ? "bg-card" : "bg-table-row-stripe",
                                    hoveredRow === row.id && "bg-table-row-hover",
                                    getRowClass(row)
                                )}
                                onMouseEnter={() => setHoveredRow(row.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                                onClick={() => onView?.(row.id)}
                            >

                                {/* Sticky Actions Column */}
                                <td
                                    className={`bg-[#f7f9fa] sticky left-0 whitespace-nowrap border-b border-table-border/50 px-4 py-3 text-sm text-foreground ${index % 2 === 0 ? "bg-card" : "bg-table-row-stripe"
                                        } ${hoveredRow === row.id ? "bg-table-row-hover" : ""} ${getRowClass(row)}`}
                                >

                                    {row.id}
                                </td>
                                <td
                                    className={`bg-[#f7f9fa] sticky left-[48px] whitespace-nowrap border-b border-table-border/50 px-4 py-3 text-sm text-foreground ${index % 2 === 0 ? "bg-card" : "bg-table-row-stripe"
                                        } ${hoveredRow === row.id ? "bg-table-row-hover" : ""} ${getRowClass(row)}`}
                                >

                                    {row.name ? row.name : '-'}
                                </td>
                                {columns.filter(
                                    (column) =>
                                        !["id", "name"].includes(column.key)
                                ).map((column, colIndex) => {
                                    return (
                                        <td
                                            key={column.key}
                                            className={`whitespace-nowrap border-b border-table-border/50 px-4 py-3 text-sm text-foreground
                                                }`}
                                        >
                                            {formatCellValue(column.key, row[column.key as keyof ReportData])}
                                        </td>
                                    );
                                })}
                                {/* Sticky Actions Column */}
                                <td
                                    className={`bg-[#f7f9fa] sticky right-0 border-b border-table-border/50 px-4 py-3 ${index % 2 === 0 ? "bg-card" : "bg-table-row-stripe"
                                        } ${hoveredRow === row.id ? "bg-table-row-hover" : ""} ${getRowClass(row)}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Dropdown placement="bottom-end">
                                            <DropdownTrigger>
                                                <button
                                                    type="button"
                                                    className="p-1 rounded hover:bg-gray-200 transition"
                                                >
                                                    <VerticalDotsIcon className="text-black-200" />
                                                </button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                                                <DropdownSection showDivider title="Actions">
                                                    <DropdownItem
                                                        key="view"
                                                        startContent={<EyeIcon />}
                                                        onClick={() => onView?.(row.id)}
                                                        className="dark:text-black"
                                                    >
                                                        View
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="edit"
                                                        startContent={<EditIcon size={25} />}
                                                        onClick={() => onEdit?.(row.id)}
                                                        className="dark:text-black"
                                                    >
                                                        Edit
                                                    </DropdownItem>
                                                </DropdownSection>
                                                <DropdownItem
                                                    key="delete"
                                                    className="text-danger dark:text-black"
                                                    color="danger"
                                                    startContent={<DeleteIcon className="text-danger" />}
                                                    onClick={() => onDelete?.(row.id)}
                                                >
                                                    Delete
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {data.length === 0 && (
                    <div className="flex items-center justify-center py-16 text-muted-foreground">
                        No reports found
                    </div>
                )}
            </div>

            {/* Row Count */}
            <div className="mt-3 text-center text-sm text-muted-foreground">
                Showing {data.length} records
            </div>
        </div>
    );
};

export default LoanReportsTable;
