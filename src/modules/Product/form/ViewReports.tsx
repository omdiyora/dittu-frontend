"use client";

import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Button, Textarea, Input, Select, SelectItem, RadioGroup, Radio } from "@nextui-org/react";
import validationSchema from "./validationSchema";
import { useRouter, useParams } from "next/navigation";
import { useStore } from "@/lib/zustand/store";

const ViewReports = () => {
    const router = useRouter();
    const params = useParams<any>();
    const today = new Date().toISOString().split("T")[0];

    const singleReportData = useStore((m) => m.singleReportData);
    const getSingleReport = useStore((m) => m.getSingleReport);

    console.log(params.id, 'paramsId', singleReportData);


    useEffect(() => {
        getSingleReport(params.id);
    }, [getSingleReport]);

    const handleSave = () => {
        console.log('Save');

    }



    return (
        <div className=" overflow-y-auto bg-white rounded-md">

            {/* Header */}
            <div className="border-b bg-white px-8 h-20 flex items-center">
                <p className="text-[21px] font-semibold">View Report</p>
            </div>

            {/* Form */}
            <div className="px-0 py-6">
                <Formik
                    enableReinitialize
                    initialValues={{
                        fno: singleReportData?.id,
                        report_date: singleReportData?.report_date,
                        name: singleReportData?.name,
                        type_loan: singleReportData?.type_loan,
                        branch: singleReportData?.branch,
                        yes_no: singleReportData?.yes_no,
                        flat_no: singleReportData?.flat_no,
                        project: singleReportData?.project,
                        rdlp_date: singleReportData?.rdlp_date,
                        rdlp_no: singleReportData?.rdlp_no,
                        sanction: singleReportData?.sanction,
                        s_date: singleReportData?.s_date,
                        bank: singleReportData?.bank,
                        loan_ac: singleReportData?.loan_ac,
                        savingAc: singleReportData?.saving_ac,
                        m_date: singleReportData?.m_date,
                        dsa: singleReportData?.dsa,
                        tcr: singleReportData?.tcr,
                        valuation: singleReportData?.valuation,
                        s_no: singleReportData?.s_no,
                        d1_date: singleReportData?.d1_date,
                        d1: singleReportData?.d1,
                        d2_date: singleReportData?.d2_date,
                        d2: singleReportData?.d2,
                        d3_date: singleReportData?.d3_date,
                        d3: singleReportData?.d3,
                        ref: singleReportData?.ref,
                        business: singleReportData?.business,
                        mobile: singleReportData?.mobile,
                        info: singleReportData?.info,
                        notes: singleReportData?.notes,
                        status: "true",
                    }}
                    // validationSchema={validationSchema()}
                    onSubmit={handleSave}
                >
                    {({ handleChange, values }) => (
                        <Form className="w-full px-12">

                            {/* GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {/* Fno */}
                                <Field label="Fno">
                                    <Input name="fno" variant="bordered" onChange={handleChange} value={values.fno} readOnly />
                                </Field>

                                {/* Date */}
                                <Field label="Date">
                                    <Input name="report_date" variant="bordered" onChange={handleChange} value={today} readOnly />
                                </Field>

                                {/* Name */}
                                <Field label="Name">
                                    <Input name="name" variant="bordered" onChange={handleChange} value={values.name} />
                                </Field>

                                {/* Loan Type */}
                                <Field label="Loan Type">
                                    <Select
                                        name="type_loan"
                                        variant="bordered"
                                        placeholder="Select loan type"
                                        onChange={handleChange}
                                        // value={values.type_loan}
                                        selectedKeys={[values.type_loan]}
                                    >
                                        <SelectItem key="home">Home Loan</SelectItem>
                                        <SelectItem key="personal">Personal Loan</SelectItem>
                                        <SelectItem key="business">Business Loan</SelectItem>
                                        <SelectItem key="education">Education Loan</SelectItem>
                                        <SelectItem key="vehicle">Vehicle Loan</SelectItem>
                                    </Select>
                                </Field>

                                {/* Branch */}
                                <Field label="Branch">
                                    <Input name="branch" variant="bordered" value={values.branch} onChange={handleChange} />
                                </Field>

                                {/* Yes / No */}
                                <Field label="Yes / No">
                                    <Select
                                        name="yes_no"
                                        variant="bordered"
                                        placeholder="Select Yes / No"
                                        onChange={handleChange}
                                        // value={values.yes_no}
                                        selectedKeys={[values.yes_no]}
                                    >
                                        <SelectItem key="home">Yes</SelectItem>
                                        <SelectItem key="personal">No</SelectItem>
                                    </Select>
                                </Field>

                                {/* Flat No */}
                                <Field label="Flat No">
                                    <Input name="flat_no" variant="bordered" onChange={handleChange} value={values.flat_no} />
                                </Field>

                                {/* Project */}
                                <Field label="Project">
                                    <Input name="project" variant="bordered" onChange={handleChange} value={values.project} />
                                </Field>

                                {/* RDLP Date */}
                                <Field label="RDLP Date">
                                    <Input type="date" name="rdlp_date" variant="bordered" onChange={handleChange} value={values.rdlp_date} />
                                </Field>

                                {/* RDLP No */}
                                <Field label="RDLP No">
                                    <Input name="rdlp_no" variant="bordered" onChange={handleChange} value={values.rdlp_no} />
                                </Field>

                                {/* Sanction */}
                                <Field label="Sanction">
                                    <Input name="sanction" variant="bordered" onChange={handleChange} value={values.sanction} />
                                </Field>

                                {/* Sanction Date */}
                                <Field label="Sanction Date">
                                    <Input type="date" name="s_date" variant="bordered" onChange={handleChange} value={values.s_date} />
                                </Field>

                                {/* Bank */}
                                <Field label="Bank">
                                    <Input name="bank" variant="bordered" onChange={handleChange} value={values.bank} />
                                </Field>

                                {/* Loan AC */}
                                <Field label="Loan A/C">
                                    <Input name="loan_ac" variant="bordered" onChange={handleChange} value={values.loan_ac} />
                                </Field>

                                {/* Saving AC */}
                                <Field label="Saving A/C">
                                    <Input name="savingAc" variant="bordered" onChange={handleChange} value={values.savingAc} />
                                </Field>

                                {/* M Date */}
                                <Field label="M Date">
                                    <Input type="date" name="m_date" variant="bordered" onChange={handleChange} value={values.m_date} />
                                </Field>

                                {/* DSA */}
                                <Field label="DSA">
                                    <Input name="dsa" variant="bordered" onChange={handleChange} value={values.dsa} />
                                </Field>

                                {/* TCR */}
                                <Field label="TCR">
                                    <Input name="tcr" variant="bordered" onChange={handleChange} value={values.tcr} />
                                </Field>

                                {/* Valuation */}
                                <Field label="Valuation">
                                    <Input name="valuation" variant="bordered" onChange={handleChange} value={values.valuation} />
                                </Field>

                                {/* S No */}
                                <Field label="S No">
                                    <Input name="s_no" variant="bordered" onChange={handleChange} value={values.s_no} />
                                </Field>

                                {/* D1 Date */}
                                <Field label="D1 Date">
                                    <Input type="date" name="d1_date" variant="bordered" onChange={handleChange} value={values.d1_date} />
                                </Field>

                                {/* D1 */}
                                <Field label="D1">
                                    <Input name="d1" variant="bordered" onChange={handleChange} value={values.d1} />
                                </Field>

                                {/* D2 Date */}
                                <Field label="D2 Date">
                                    <Input type="date" name="d2_date" variant="bordered" onChange={handleChange} value={values.d2_date} />
                                </Field>

                                {/* D2 */}
                                <Field label="D2">
                                    <Input name="d2" variant="bordered" onChange={handleChange} value={values.d2} />
                                </Field>

                                {/* D3 Date */}
                                <Field label="D3 Date">
                                    <Input type="date" name="d3_date" variant="bordered" onChange={handleChange} value={values.d3_date} />
                                </Field>

                                {/* D3 */}
                                <Field label="D3">
                                    <Input name="d3" variant="bordered" onChange={handleChange} value={values.d3} />
                                </Field>

                                {/* Reference */}
                                <Field label="Reference">
                                    <Input name="ref" variant="bordered" onChange={handleChange} value={values.ref} />
                                </Field>

                                {/* Business */}
                                <Field label="Business">
                                    <Input name="business" variant="bordered" onChange={handleChange} value={values.business} />
                                </Field>

                                {/* Mobile */}
                                <Field label="Mobile">
                                    <Input name="mobile" variant="bordered" onChange={handleChange} value={values.mobile} />
                                </Field>

                                {/* Info */}
                                <Field label="Info">
                                    <Input name="info" variant="bordered" onChange={handleChange} value={values.info} />
                                </Field>

                                {/* Notes - FULL WIDTH */}
                                <div className="lg:col-span-3">
                                    <label className="text-sm font-medium">Notes</label>
                                    <Textarea
                                        name="notes"
                                        variant="bordered"
                                        className="mt-2"
                                        minRows={3}
                                        onChange={handleChange}
                                        value={values.notes}
                                    />
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-4 mt-8">
                                <Button
                                    size="lg"
                                    variant="flat"
                                    onClick={() => router.push("/dashboard/reports")}
                                >
                                    Back
                                </Button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ViewReports;

/* Reusable Field Wrapper */
const Field = ({ label, children }: any) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <div className="mt-2">{children}</div>
    </div>
);
