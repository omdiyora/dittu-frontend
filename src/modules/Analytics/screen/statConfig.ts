// statConfig.ts
import {
  FaChartBar,
  FaHome,
  FaUserTie,
  FaBriefcase,
  FaGraduationCap,
  FaCar,
} from "react-icons/fa";

export const STAT_CONFIG = {
  total: {
    label: "Total Report",
    icon: FaChartBar,
    iconColor: "text-orange-500",
    bg: "bg-[#FFC4AA]",
    glow: "hover:shadow-orange-400/50",
  },
  home: {
    label: "Home Loan",
    icon: FaHome,
    iconColor: "text-orange-400",
    bg: "bg-[#FFF1DD]",
    glow: "hover:shadow-orange-300/50",
  },
  personal: {
    label: "Personal Loan",
    icon: FaUserTie,
    iconColor: "text-[#FFB18D]",
    bg: "bg-[#FFEBE2]",
    glow: "hover:shadow-orange-300/50",
  },
  business: {
    label: "Business Loan",
    icon: FaBriefcase,
    iconColor: "text-orange-500",
    bg: "bg-[#FFF1DD]",
    glow: "hover:shadow-orange-400/50",
  },
  education: {
    label: "Education Loan",
    icon: FaGraduationCap,
    iconColor: "text-green-600",
    bg: "bg-[#dcfce7]",
    glow: "hover:shadow-green-400/50",
  },
  vehicle: {
    label: "Vehicle Loan",
    icon: FaCar,
    iconColor: "text-red-500",
    bg: "bg-[#FFDDDD]",
    glow: "hover:shadow-red-400/50",
  },
};
