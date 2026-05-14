import { clientAPICaller } from "@/utils/handler/client";
import { StateCreator } from "zustand";
import { getDashboardComplianceOverview, getDashboardCompliancePie, getDashboardStatusData } from "./queries";

export type AuditDashboardStoreValues = {
    dashboardAuditStatusData: any | null;
    dashboardComplianceOverviewData: any | null;
    dashboardCompliancePieData: any | null;
};

export type AuditDashboardStoreActions = {
    getDashboardStatusData: (values: any) => void;
    getDashboardComplianceOverview: (values: any) => void;
    getDashboardCompliancePie: (values: any) => void;
};

export type AuditDashboardSlice = AuditDashboardStoreValues & AuditDashboardStoreActions;

const defaultAuthValues: AuditDashboardStoreValues = {
    dashboardAuditStatusData: null,
    dashboardComplianceOverviewData: null,
    dashboardCompliancePieData: null,
};

export const auditDashboardSlice: (
    initProps: Partial<AuditDashboardStoreValues>
) => StateCreator<AuditDashboardSlice, [], [], AuditDashboardSlice> =
    (props = {}) =>
        (set, get, api) => ({
            ...defaultAuthValues,
            ...props,
            getDashboardStatusData: async (values: any) => {
                let data = await clientAPICaller<any[]>(getDashboardStatusData(values));
                set((state) => ({ ...state, dashboardAuditStatusData: data.data }));
            },
            getDashboardCompliancePie: async (values: any) => {
                let data = await clientAPICaller<any[]>(getDashboardCompliancePie(values));
                set((state) => ({ ...state, dashboardCompliancePieData: data.data }));
            },
            getDashboardComplianceOverview: async (values: any) => {
                let data = await clientAPICaller<any[]>(getDashboardComplianceOverview(values));
                set((state) => ({ ...state, dashboardComplianceOverviewData: data.data }));
            },
        });
