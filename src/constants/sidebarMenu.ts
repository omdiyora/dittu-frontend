import { MdDashboard, MdPeople, MdShoppingCart } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { AiFillPieChart } from "react-icons/ai";

export const sidebarMenu = [
  {
    label: "Dashboard",
    icon: BiSolidDashboard,
    route: "/admin/orders",
  },
  {
    label: "Product Management",
    icon: MdDashboard,
    subMenu: [
      {
        label: "Create Product",
        icon: BiSolidDashboard,
        route: "/admin/product/create",
      },
      {
        label: "Product List",
        icon: FaClipboardList,
        route: "/admin/product",
      },
    ],
  },
  {
    label: "User Management",
    icon: MdPeople,
    subMenu: [
      {
        label: "Create User",
        icon: BiSolidDashboard,
        route: "/users/create",
      },
      {
        label: "User List",
        icon: FaClipboardList,
        route: "/users",
      },
    ],
  },
  {
    label: "Orders",
    icon: MdShoppingCart,
    route: "/admin/orders",
  },
  {
    label: "Reports",
    icon: AiFillPieChart,
    route: "/reports",
  },
  {
    label: "Analytics",
    icon: AiFillPieChart,
    route: "/analytics",
  },
];