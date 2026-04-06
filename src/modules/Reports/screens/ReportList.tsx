"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    // DateRangePicker,
} from "@heroui/react";
import { useStore } from "@/lib/zustand/store";
import moment from "moment";
import { Tooltip } from "@heroui/react";
import Swal from "sweetalert2";
import { DateRangePicker } from "@heroui/date-picker";
import { parseDate, DateValue } from "@internationalized/date";
import { CalendarDate } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import LoanReportsTable from "@/components/LoanReportsTable";
import { Spinner } from "@heroui/react";

// ---------------- TYPES ----------------
interface ReportData {
    id: string | number;
    Rday?: string;
    Sday?: string;
    Mday?: string;
    [key: string]: any;
}

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

function numberToIndianRupees(num: any) {
    if (num === 0) return 'Zero Rupees';

    const ones = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
        'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
        'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
        'Seventeen', 'Eighteen', 'Nineteen'
    ];

    const tens = [
        '', '', 'Twenty', 'Thirty', 'Forty',
        'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    const convertBelowHundred = (n: any) => {
        if (n < 20) return ones[n];
        return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    };

    let result = '';

    const crore = Math.floor(num / 10000000);
    num %= 10000000;

    const lakh = Math.floor(num / 100000);
    num %= 100000;

    const thousand = Math.floor(num / 1000);
    num %= 1000;

    const hundred = Math.floor(num / 100);
    num %= 100;

    if (crore) result += convertBelowHundred(crore) + ' Crore ';
    if (lakh) result += convertBelowHundred(lakh) + ' Lakh ';
    if (thousand) result += convertBelowHundred(thousand) + ' Thousand ';
    if (hundred) result += ones[hundred] + ' Hundred ';
    if (num) result += convertBelowHundred(num) + ' ';

    return result.trim() + ' Rupees Only';
}

function formatIndianShort(amount: number) {
    if (!amount || isNaN(amount)) return "₹ 0";

    if (amount >= 1_00_00_000) {
        return `₹ ${(amount / 1_00_00_000).toFixed(2)} Cr`;
    }

    if (amount >= 1_00_000) {
        return `₹ ${(amount / 1_00_000).toFixed(2)} Lakh`;
    }

    return `₹ ${amount.toLocaleString('en-IN')}`;
}

const parseDDMMYYYY = (dateStr: any) => {
    if (!dateStr) return null;

    const [day, month, year] = dateStr.split('-');
    return new Date(year, month - 1, day);
};

// ---------------- COMPONENT ----------------
export default function ReportList() {
    const router = useRouter();

    const reportData = useStore((m) => m.reportData);
    const getReport = useStore((m) => m.getReport);
    const deleteReport = useStore((m) => m.deleteReport);


    // const reports: ReportData[] = reportData ?? [];
    const reports: ReportData[] = reportData ?? [];

    // ---------------- FETCH ----------------
    useEffect(() => {
        getReport();
    }, [getReport]);

    // ---------------- ROW COLOR ----------------
    const getRowClass = (row: ReportData) => {
        const r = Number(row.rday || row.Rday || 0);
        const s = Number(row.sday || row.Sday || 0);
        const m = Number(row.mday || row.Mday || 0);

        if (r > 0) return "bg-red-100 text-red-900";
        if (s > 0) return "bg-orange-100 text-orange-900";
        if (m > 0) return "bg-blue-100 text-blue-900";

        return "bg-green-50";
    };

    // ---------------- EXPORT CSV ----------------
    const exportToExcel = () => {
        if (!reports.length) return;

        const headers = Object.keys(reports[0]).join(",");

        const rows = reports.map((row) =>
            Object.values(row)
                .map((v) => `"${v ?? ""}"`)
                .join(",")
        );

        const csvContent = [headers, ...rows].join("\n");
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "loan_reports.csv";
        link.click();
    };

    // ---------------- FILTER STATES ----------------
    const [search, setSearch] = useState("");
    const [branch, setBranch] = useState("");
    const [project, setProject] = useState("");
    const [rdlpDate, setRdlpDate] = useState("");
    const [sDate, setSDate] = useState("");
    const [mDate, setMDate] = useState("");

    const [rdlpRange, setRdlpRange] =
        useState<RangeValue<CalendarDate> | null>(null);

    const [sRange, setSRange] = useState<{
        start: DateValue | null;
        end: DateValue | null;
    } | null>(null);

    const [mRange, setMRange] = useState<{
        start: DateValue | null;
        end: DateValue | null;
    } | null>(null);

    // ---------------- FILTER LOGIC ----------------

    const filteredReports = useMemo(() => {
        return reports.filter((r) => {
            const commonMatch = Object.values(r)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase());

            return (
                commonMatch &&
                (!branch || r.BRANCH?.toLowerCase().includes(branch.toLowerCase())) &&
                (!project || r.PROJECT?.toLowerCase().includes(project.toLowerCase())) &&
                (!rdlpDate || r.RDLP_DATE === rdlpDate) &&
                (!sDate || r.S_DATE === sDate) &&
                (!mDate || r.M_DATE === mDate)
            );
        });
    }, [reports, search, branch, project, rdlpDate, sDate, mDate]);

    // ---------------- COLUMNS (SAFE) ----------------
    const reportColumns = useMemo(() => {
        if (!reports.length) return [];
        return Object.keys(reports[0]).map((key) => ({
            uid: key,
            name: key.replaceAll("_", " ").toUpperCase(),
        }));
    }, [reports]);

    // columnss 
    const columns = [
        ...reportColumns,
        {
            uid: 'action',
            name: 'ACTION',
        }
    ]

    // ---------------- LOADING STATE ----------------
    if (!reports.length) {
        return <div className="flex h-[70vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <Spinner color="primary" />
                <span className="text-sm text-black">Loading...</span>
            </div>
        </div>;
    }

    const handleDelete = async (values: any) => {
        Swal.fire({
            title: "Are you sure you want to delete this report?",
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
                const response = await deleteReport(values);
                getReport();
            }
        });
    };

    const handleEdit = async (item: any) => {
        router.push(`/dashboard/reports/edit/${item}`)
    };

    const handleView = async (item: any) => {
        router.push(`/dashboard/reports/view/${item}`)
    };

    // const currentMonthReports = filteredReports.filter(report => {
    //     if (!report.RDLP_DATE && !report.rdlp_date) return false;

    //     const reportDate = parseDDMMYYYY(report.RDLP_DATE || report.rdlp_date);
    //     // @ts-ignore
    //     if (!reportDate || isNaN(reportDate)) return false;

    //     const now = new Date();
    //     // const currentDate = new Date().toISOString().split("T")[0];
    //     const currentDate = new Intl.DateTimeFormat("en-CA", {
    //         year: "numeric",
    //         month: "2-digit",
    //     }).format(new Date());
    //     console.log(report.RDLP_DATE, 'RDLP_DATE', report.rdlp_date, 'now', currentDate);


    //     return (
    //         reportDate.getMonth() === now.getMonth() &&
    //         reportDate.getFullYear() === now.getFullYear()
    //     );
    // });

    const currentDate = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
    }).format(new Date());

    const currentMonthReports = reports.filter(r =>
        r.rdlp_date?.startsWith(currentDate)
    );

    const niravReports = currentMonthReports.filter(report =>
        report.dsa?.trim().toUpperCase() === 'NIRAV'
    );

    const sonikaReports = currentMonthReports.filter(report =>
        report.dsa?.trim().toUpperCase() === 'SONIKA'
    );

    const totalNiravSanctionAmount = niravReports.reduce(
        (total, report) => total + Number(report.sanction || 0),
        0
    );

    const totalSonikaSanctionAmount = sonikaReports.reduce(
        (total, report) => total + Number(report.sanction || 0),
        0
    );

    const grandTotalSanctionAmount =
        totalNiravSanctionAmount + totalSonikaSanctionAmount;

    const currentMonth = new Date().toLocaleString("en-IN", {
        month: "long",
    });

    // ---------------- RENDER ----------------
    return (
        <div className="pt-0 p-4">
            {/* FILTERS + ACTIONS */}
            <div className="flex flex-wrap gap-4 mb-4">
                {/* Total of Current Month */}
                <div className="flex items-center justify-between bg-white rounded-xl border shadow-sm px-5 h-12 min-w-[280px] hover:shadow-md transition">
                    <div>
                        <p className="font-bold text-lg text-black uppercase tracking-wide mr-4">
                            Total of {currentMonth} <span className="font-bold text-lg text-black">{formatIndianShort(grandTotalSanctionAmount)}</span>
                        </p>
                    </div>
                    <div className="text-xs font-medium bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                        {currentMonthReports?.length} Reports
                    </div>
                </div>

                {/* Nirav */}
                <div className="flex items-center justify-between bg-white rounded-xl border shadow-sm px-5 h-12 min-w-[280px] hover:shadow-md transition">
                    <div>
                        <p className="font-bold text-lg text-black uppercase tracking-wide mr-4">
                            Nirav <span className="font-bold text-lg text-black">{formatIndianShort(totalNiravSanctionAmount)}</span>
                        </p>
                    </div>
                    <div className="text-xs font-medium bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                        {niravReports?.length} Reports
                    </div>
                </div>

                {/* Sonika */}
                <div className="flex items-center justify-between bg-white rounded-xl border shadow-sm px-5 h-12 min-w-[280px] hover:shadow-md transition">
                    <div>
                        <p className="font-bold text-lg text-black uppercase tracking-wide mr-4">
                            Sonika <span className="font-bold text-lg text-black">{formatIndianShort(totalSonikaSanctionAmount)}</span>
                        </p>
                    </div>
                    <div className="text-xs font-medium bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                        {sonikaReports?.length} Reports
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-4">
                <Input label="Search" placeholder="Search by any keyword" value={search} onValueChange={setSearch} />
                <Input label="Branch" placeholder="Search by branch" value={branch} onValueChange={setBranch} />
                <Input label="Project" placeholder="Search by project" value={project} onValueChange={setProject} />
                <DateRangePicker
                    label="RDLP Date"
                    // @ts-ignore
                    value={rdlpRange}
                    classNames={{

                        separator: "mx-2 text-gray-400",
                        calendarContent: `
                            /* Start & End date */
                            [&_[data-selected=true]]:bg-primary
                            [&_[data-selected=true]]:text-white

                            /* Range dates */
                            [&_[data-range=true]:not([data-selected=true])]:bg-primary/30
                        `,
                    }}
                />
                <DateRangePicker
                    label="S Date"
                    classNames={{
                        separator: "mx-2 text-gray-400",
                        calendarContent: `
                            /* Start & End date */
                            [&_[data-selected=true]]:bg-primary
                            [&_[data-selected=true]]:text-white

                            /* Range dates */
                            [&_[data-range=true]:not([data-selected=true])]:bg-primary/30
                        `,
                    }}
                />
                <DateRangePicker
                    label="M Date"
                    classNames={{
                        separator: "mx-2 text-gray-400",
                        calendarContent: `
                            /* Start & End date */
                            [&_[data-selected=true]]:bg-primary
                            [&_[data-selected=true]]:text-white

                            /* Range dates */
                            [&_[data-range=true]:not([data-selected=true])]:bg-primary/30
                        `,
                    }}
                />


                {/* <Input label="RDLP Date" value={rdlpDate} onValueChange={setRdlpDate} /> */}
                {/* <Input label="S Date" value={sDate} onValueChange={setSDate} />
                <Input label="M Date" value={mDate} onValueChange={setMDate} /> */}

                <div className="flex gap-2 mt-2">
                    <Button
                        color="primary"
                        onPress={() => router.push("/admin/product/create")}
                    >
                        Add Report
                    </Button>
                    <Button color="primary" onPress={exportToExcel}>
                        Export Report
                    </Button>
                </div>
            </div>

            <main className="w-full px-0 py-6">
                <LoanReportsTable
                    // @ts-ignore
                    data={filteredReports}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                // getRowClass={getRowClass}
                />
            </main>
        </div>
    );
}
