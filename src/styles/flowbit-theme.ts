import { type CustomFlowbiteTheme } from "flowbite-react";
import { text } from "stream/consumers";

export const flowbiteTheme: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      base: "min-h-screen bg-white",
      inner: "h-full overflow-y-auto overflow-x-hidden text-black py-4 px-3",
    },
    collapse: {
      icon: { base: "" },
      label: { base: "p-2 w-full text-left"},
    },
    item: {
      icon: { base: "text-black", active:
        "text-white"
      },
      base: "no-underline flex items-center rounded-lg text-lg p-2 py-3 mt-1 font-normal text-gray-900 dark:hover:bg-gray-700",
    },
    itemGroup: {
      base: "list-none border-t border-gray-200 pt-3 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    },
  },
};
