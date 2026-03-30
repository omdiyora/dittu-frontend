import { clientAPICaller } from "@/utils/handler/client";
import { addAssessmentFrameworkData, deleteAssessmentFrameworkData, getAllAssessmentFramework, updateAssessmentFrameworkData } from "./queries";
import { StateCreator } from "zustand";
import { AssessmentFramework, AssessmentFrameworkResponse } from "./interfaces";



export type AssessmentFrameworkStoreValues = {
  assessmentFrameworksData: AssessmentFramework | null;
  allAssessmentFrameworks: any
};

export type AssessmentFrameworkStoreActions = {
  AddAssessmentFrameWork: (params: AssessmentFramework) => void;
  deleteAssessmentFrameWork: (id: string) => void;
  updateAssessmentFrameWork: (params: AssessmentFramework) => void
  getAllAssessmentFramework: (id?: number) => void;
};

export type AssessmentFrameworkSlice = AssessmentFrameworkStoreValues & AssessmentFrameworkStoreActions;

const defaultAssessmentValues: AssessmentFrameworkStoreValues = {
  assessmentFrameworksData: null,
  allAssessmentFrameworks: null,
};

export const createAssessmentFrameworkSlice: (
  initProps: Partial<AssessmentFrameworkStoreValues>
) => StateCreator<AssessmentFrameworkSlice, [], [], AssessmentFrameworkSlice> =
  (props = {}) =>
    (set, get, api) => ({
      ...defaultAssessmentValues,
      ...props,
      AddAssessmentFrameWork: async (params: AssessmentFramework) => {
        let res = await clientAPICaller<AssessmentFrameworkResponse[]>(
          addAssessmentFrameworkData(params)
        );
        return res;
      },
      updateAssessmentFrameWork: async (params: AssessmentFramework) => {
        let res = await clientAPICaller<AssessmentFrameworkResponse[]>(
          updateAssessmentFrameworkData(params)
        );
        return res
      },
      deleteAssessmentFrameWork: async (id: string) => {
        let res = await clientAPICaller<string>(
          deleteAssessmentFrameworkData(id)
        );
        return res;
      },
      getAllAssessmentFramework: async (id?: number) => {
        let data = await clientAPICaller<AssessmentFrameworkResponse[]>(
          getAllAssessmentFramework(id)
        );

        set((state) => ({ ...state, allAssessmentFrameworks: data.data }));
      },
    });