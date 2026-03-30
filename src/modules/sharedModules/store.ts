import { clientAPICaller } from "@/utils/handler/client";
import { StateCreator } from "zustand";
import {
  createReport,
  getReport,
  getSingleReport,
  updateReport,
  deleteReport,
  createContact,
  getContact,
  createUser,
  getUser
} from "./queries";

export type SharedStoreValues = {
  reportData: any | null;
  singleReportData: any | null;
  contactData: any | null;
  userData: any | null;
};

export type SharedStoreActions = {
  createReport: (values: any) => void;
  getReport: () => void;
  getSingleReport: (id?: number) => void;
  updateReport: (values: any) => void;
  deleteReport: (values: any) => void;
  createContact: (values: any) => void;
  getContact: () => void;
  createUser: (values: any) => void;
  getUser: () => void;
};

export type SharedSlice = SharedStoreValues & SharedStoreActions;

const defaultAuthValues: SharedStoreValues = {
  reportData: null,
  singleReportData: null,
  contactData: null,
  userData: null,
};

export const createSharedSlice: (
  initProps: Partial<SharedStoreValues>
) => StateCreator<SharedSlice, [], [], SharedSlice> =
  (props = {}) =>
    (set, get, api) => ({
      ...defaultAuthValues,
      ...props,
      createReport: async (values: any) => {
        let res = await clientAPICaller<any[]>(createReport(values));
        return res;
      },
      getReport: async () => {
        let data = await clientAPICaller<any[]>(getReport());
        set((state) => ({ ...state, reportData: data.data }));
      },
      getSingleReport: async (id?: number) => {
        let data = await clientAPICaller<any[]>(getSingleReport(id));
        set((state) => ({ ...state, singleReportData: data.data }));
      },
      updateReport: async (params: any) => {
        let res = await clientAPICaller<any[]>(updateReport(params));
        return res;
      },
      deleteReport: async (id: string) => {
        let res = await clientAPICaller<string>(deleteReport(id));
        return res;
      },
      createContact: async (values: any) => {
        let res = await clientAPICaller<any[]>(createContact(values));
        return res;
      },
      getContact: async () => {
        let data = await clientAPICaller<any[]>(getContact());
        set((state) => ({ ...state, contactData: data.data }));
      },
      createUser: async (values: any) => {
        let res = await clientAPICaller<any[]>(createUser(values));
        return res;
      },
      getUser: async () => {
        let data = await clientAPICaller<any[]>(getUser());
        set((state) => ({ ...state, userData: data.data }));
      },
    });