import { clientAPICaller } from "@/utils/handler/client";
import {
  createUserResetPassword,
  userChangePasswordQuery,
  userForgetPasswordQuery,
  userLoginQuery,
  userResetPasswordQuery,
} from "./queries";
import { StateCreator } from "zustand";
import {
  User,
  userChangePram,
  userForgetPram,
  userLoginQueryParam,
  userResetPasswordvalues,
} from "./interfaces";

export type AuthStoreValues = {
  user: User | null;
  loginCred: { identifier: string; password: string, user_agent: string, ip_address: string; } | null;
  loginError: any;
  loginSubmitting: boolean;
  forgetcred: { email: string } | null;
  forgetPasswordError: string;
  resetPasswordcred: { password: string } | null;
  resetPasswordError: string;
  changePasswordcred: { email: string; password: string } | null;
  changePasswordError: string;
  userChangePasswordcred: any;
};

export type AuthStoreActions = {
  userLogin: (paramValues: userLoginQueryParam) => Promise<void>;
  userLogout: () => void;
  verification: (user: User) => void;
  userForgetPassword: (paramValues: userForgetPram) => Promise<void>;
  userResetPassword: (
    values: userResetPasswordvalues,
    params: string
  ) => Promise<void>;
  userChangePassword: (paramValues: userChangePram) => Promise<void>;
  createUserResetPassword: (paramValues: userChangePram) => Promise<void>;
};

export type AuthSlice = AuthStoreValues & AuthStoreActions;

const defaultAuthValues: AuthStoreValues = {
  user: null,
  loginSubmitting: false,
  loginError: "",
  loginCred: null,
  forgetcred: null,
  forgetPasswordError: "",
  resetPasswordcred: null,
  resetPasswordError: "",
  changePasswordcred: null,
  changePasswordError: "",
  userChangePasswordcred: null,
};

export const createAuthSlice: (
  initProps: Partial<AuthStoreValues>
) => StateCreator<AuthSlice, [], [], AuthSlice> =
  (props = {}) =>
    (set, get, api) => ({
      ...defaultAuthValues,
      ...props,
      userLogin: async (paramValues: userLoginQueryParam) => {
        set((s) => ({ ...s, loginSubmitting: true }));
        let data = await clientAPICaller<ResponseInit & { message: string }>(
          userLoginQuery(paramValues)
        );
        set((s) => ({ ...s, loginSubmitting: false }));
        if (data.status === 200) {
          if (data.data?.email) {

            localStorage.setItem("userEmail", data.data.email); // Save email in localStorage
          }
          // @ts-ignore
          set((s) => ({ ...s, loginCred: paramValues, loginError: "" }));
        } else {
          set((s) => ({ ...s, loginError: data }));
        }
      },
      userLogout: () => {
        set((state) => ({ ...state, ...defaultAuthValues }));
      },
      verification: (user: User) => {
        set((state) => ({ ...state, user: user }));
      },
      userForgetPassword: async (paramValues: userForgetPram) => {
        let data = await clientAPICaller<ResponseInit & { message: string }>(
          userForgetPasswordQuery(paramValues)
        );

        if (data.status === 200) {
          set((s) => ({
            ...s,
            forgetcred: paramValues,
            forgetPasswordError: "",
          }));
        } else {
          set((s) => ({ ...s, forgetPasswordError: data?.message }));
        }
      },
      userResetPassword: async (
        paramValues: userResetPasswordvalues,
        params: string
      ) => {
        let data = await clientAPICaller<ResponseInit & { message: string }>(
          userResetPasswordQuery(paramValues, params)
        );
        if (data.status === 200) {
          set((s) => ({
            ...s,
            resetPasswordcred: paramValues,
            resetPasswordError: "",
          }));
        } else {
          set((s) => ({ ...s, resetPasswordError: data?.message }));
        }
      },
      createUserResetPassword: async (paramValues: any) => {
        let data = await clientAPICaller<ResponseInit & { message: string }>(
          createUserResetPassword(paramValues)
        );
        return data;
      },
      userChangePassword: async (paramValues: userChangePram) => {
        let data = await clientAPICaller<ResponseInit & { message: string }>(
          userChangePasswordQuery(paramValues)
        );
        if (data.status === 200) {
          set(
            (s) =>
            ({
              ...s,
              changePasswordcred: paramValues,
              changePasswordError: "",
            } as any)
          );
        } else {
          set((s) => ({ ...s, changePasswordError: data?.message }));
        }
      },
    });
