import {
  createAuthSlice,
  AuthSlice,
  AuthStoreValues,
} from "@/modules/Auth/store";

import {
  SharedSlice,
  createSharedSlice,
  SharedStoreValues,
} from "@/modules/sharedModules/store";


import { createContext, useContext } from "react";
import { create, useStore as useZustandStore } from "zustand";
import { removeUndefined } from "@/helpers/removeUndefined";
import { persist } from "zustand/middleware";
import deepmerge from "deepmerge";


import { auditDashboardSlice, AuditDashboardSlice, AuditDashboardStoreValues } from "@/modules/Dashboard/store";


export interface PreloadedStoreInterface
  extends Partial<
    AuthStoreValues &
    SharedStoreValues
  > { }

export type StoreInterface = AuthSlice &
  SharedSlice;

export type StoreType = ReturnType<typeof initializeStore>;

const storeContext = createContext<StoreType | null>(null);

export const Provider = storeContext.Provider;

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(storeContext);
  if (!store) throw new Error("Store is missing the provider");
  return useZustandStore(store, selector);
};

export const initializeStore = ({
}: PreloadedStoreInterface) => {
  return create(
    persist<StoreInterface>(
      (...a) => ({
        ...createAuthSlice(removeUndefined({}))(...a),

        ...createSharedSlice(
          removeUndefined({
          })
        )(...a),
      }),
      {
        name: "CAPortal",
        merge: (persistedState = {}, currentState) =>
          deepmerge(persistedState as any, currentState, {
            arrayMerge: (target, source) => source,
          }),
      }
    )
  );
};
