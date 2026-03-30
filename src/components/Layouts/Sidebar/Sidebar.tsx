// import { Sidebar } from "flowbite-react";
// import {
//   incidentMenu,
//   riskMenu,
//   superAdminMenu,
//   accessManagementAdminMenu,
//   auditEndUserMenu,
//   auditCustomerMenu,
//   auditAnalystMenu,
//   auditManagerMenu,
//   accessManagementAudit
// } from "@/constants/sidebarMenu";
// import { usePathname, useRouter } from "next/navigation";
// import { rolesConstants } from "@/constants/roles";
// import { useStore } from "@/lib/zustand/store";
// import { useSession } from "next-auth/react";
// import { useEffect, useMemo, useState } from "react";
// import { Tooltip } from "@nextui-org/react";
// import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
// import { platformSuperAdmin } from "@/constants/cbPartnerNames";
// import Link from "next/link";

// const SidebarMenu = ({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: any;
// }) => {
//   const path = usePathname();
//   const router = useRouter();
//   const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});


//   const {
//     getAssessmentFrameworks,
//     assessmentFrameworks,
//   } = useStore((s) => s);

//   let defaultArmoryzeLogo = `https://csb10037ffe9769219c.blob.core.windows.net/logo/logo.png?sv=2023-11-03&st=2024-08-27T12%3A18%3A13Z&se=2025-08-27T12%3A18%3A13Z&sr=b&sp=r&sig=qBnJereVjdYEholnovQGEsPGQMxPKHxWgRGt7bXY%2F%2BE%3D`;

//   const handleNavigate = (url: string) => {
//     router.push(url);
//   };

//   const { data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/login");
//     },
//   });


//   useEffect(() => {
//     if (session?.user.id) {
//       getAssessmentFrameworks(session?.user.id);
//     }
//   }, [session, session?.user.id]);

  

//   const menu = useMemo(() => {
//     if (session?.user?.client_organization_name === platformSuperAdmin.BLUE_PEAK_CONSULTANCY) {
//       return superAdminMenu.map((menuItem) => {
//         if (menuItem.label === "Audit Management") {
//           console.log(assessmentFrameworks,'assessmentFrameworks');
          
//           return {
//             ...menuItem,
//             subMenu: menuItem.subMenu.map((subItem) =>
//               subItem.label === "Assessment"
//                 ? {
//                   ...subItem,
//                   subMenu: assessmentFrameworks?.data?.map((m) => ({
//                     label: m.assessment_name,
//                     route: "/assessment/" + m.id,
//                   })) || [],
//                 }
//                 : subItem
//             ),
//           };
//         }
//         return menuItem;
//       });
//     }

//     // If user is Active
//     // if (session?.user.grc_user_status === 'Active') {
//     const finalMenu: any[] = [];

//     let hasAdminAccess = false;

//     // Risk Role
//     if (session?.user.risk_role_id === '1' || session?.user.risk_role_id === '2') {
//       finalMenu.push(...riskMenu);
//     } else if (session?.user.risk_role_id === '3') {
//       hasAdminAccess = true;
//       finalMenu.push(...riskMenu);
//     }

//     // Incident Role
//     if (session?.user.incident_role_id === '1' || session?.user.incident_role_id === '2') {
//       finalMenu.push(...incidentMenu);
//     } else if (session?.user.incident_role_id === '3') {
//       hasAdminAccess = true;
//       finalMenu.push(...incidentMenu);
//     }


//     // Add Audit Menu if necessary
//     if (session?.user.audit_role_id === '1' || session?.user.audit_role_id === '5') {
//       // END USER MENU
//       const auditManagementItem = auditEndUserMenu.find(item => item.label === "Audit Management");
//       if (auditManagementItem) {
//         finalMenu.push({
//           ...auditManagementItem,
//           subMenu: auditManagementItem.subMenu.map((subItem) =>
//             subItem.label === "Assessment"
//               ? {
//                 ...subItem,
//                 subMenu:
//                   assessmentFrameworks?.data?.map((m) => ({
//                     label: m.assessment_name,
//                     route: "/assessment/" + m.id,
//                   })) || [],
//               }
//               : subItem
//           ),
//         });
//       }
//     } else if (session?.user.audit_role_id === '2') {
//       const auditManagementItem = auditAnalystMenu.find(item => item.label === "Audit Management");
//       if (auditManagementItem) {
//         finalMenu.push({
//           ...auditManagementItem,
//           subMenu: auditManagementItem.subMenu.map((subItem) =>
//             subItem.label === "Assessment"
//               ? {
//                 ...subItem,
//                 subMenu:
//                   assessmentFrameworks?.data?.map((m) => ({
//                     label: m.assessment_name,
//                     route: "/assessment/" + m.id,
//                   })) || [],
//               }
//               : subItem
//           ),
//         });
//       }
//     } else if (session?.user.audit_role_id === '3') {
//       hasAdminAccess = true;
//       const auditManagementItem = auditManagerMenu.find(item => item.label === "Audit Management");
//       if (auditManagementItem) {
//         finalMenu.push({
//           ...auditManagementItem,
//           subMenu: auditManagementItem.subMenu.map((subItem) =>
//             subItem.label === "Assessment"
//               ? {
//                 ...subItem,
//                 subMenu:
//                   assessmentFrameworks?.data?.map((m) => ({
//                     label: m.assessment_name,
//                     route: "/assessment/" + m.id,
//                   })) || [],
//               }
//               : subItem
//           ),
//         });
//       }
//     }

//     // Add admin-specific menu items if hasAdminAccess is true
//     if (hasAdminAccess) {
//       finalMenu.push(...accessManagementAdminMenu);
//     }
//     if (
//       ['1', '2'].includes(session?.user.audit_role_id) ||
//       ['1', '2'].includes(session?.user.risk_role_id) ||
//       ['1', '2'].includes(session?.user.incident_role_id)
//     ) {
//       finalMenu.push(...accessManagementAudit);
//     }

//     return finalMenu;
//   }, [
//     session?.user,
//     session?.user.grc_user_status,
//     session?.user.role,
//     session?.user.risk_role_id,
//     session?.user.audit_role_id,
//     session?.user.incident_role_id,
//     assessmentFrameworks?.data,
//     path,
//   ]);

//   const isSubMenuActive = (subMenu: any[]): boolean => {
//     return subMenu.some((item) => {
//       if (item.subMenu) return isSubMenuActive(item.subMenu);
//       return path === item.route || path.startsWith(item.route + "/");
//     });
//   };

//   const renderSidebarItems = (items: any[]) => {
//     return items.map((item) => {
//       if (item.subMenu && Array.isArray(item.subMenu)) {
//         const isOpen = isSubMenuActive(item.subMenu);

//         return (
//           <Sidebar.Collapse
//             key={item.label}
//             icon={item.icon}
//             label={item.label}
//             open={openMenus[item.label] ?? isSubMenuActive(item.subMenu)} // <-- use state or auto-detect
//             onClick={() =>
//               setOpenMenus((prev) => ({
//                 ...prev,
//                 [item.label]: !prev[item.label],
//               }))
//             }
//             className="nunito-semibold text-[15px]"
//           >
//             <div className="pl-4">
//               {renderSidebarItems(item.subMenu)}
//             </div>
//           </Sidebar.Collapse>
//         );
//       }

//       return (
//         <Sidebar.Item
//           key={item.label}
//           active={path === item.route}
//           className={
//             path === item.route
//               ? "bg-[#1F8DF5] hover:bg-[#1F8DF5] text-white pl-0"
//               : "hover:bg-black/10 pl-0"
//           }
//         >
//           <Link
//             href={item.route || "#"}
//             className="flex items-center gap-3 w-full"
//             target="_self"
//           >
//             <span style={{ marginLeft: "-5px" }}>
//               {item.icon && <item.icon />}
//             </span>
//             <span
//               className="text-[14px] leading-none hover:cursor-pointer nav-link nunito-semibold"
//               style={{
//                 marginRight: item.label === "Dashboard" ? "-30px" : undefined,
//               }}
//             >
//               {item.label}
//             </span>
//           </Link>
//         </Sidebar.Item>
//       );
//     });
//   };

//   return (
//     <div className="lg:relative md:relative fixed  h-screen flex bg-[#f9fafb] z-40 nunito-semibold">
//       <Sidebar
//         aria-label="Sidebar"
//         className={`${isOpen ? "sidebar-open" : "sidebar-closed hidden"}`}
//       >
//         <>
//           <Sidebar.ItemGroup className="mb-4">
//             <Sidebar.Item
//               className="font-bold text-mono hover:bg-white text-2xl pt-2"
//               onClick={() => handleNavigate("/")}
//             >
//               <img
//                 src={"/assets/images/logo.png"}
//                 width="auto"
//                 alt="Logo"
//               />
//             </Sidebar.Item>
//           </Sidebar.ItemGroup>

//           <Sidebar.Items>{renderSidebarItems(menu)}</Sidebar.Items>
//         </>
//       </Sidebar>

//       <div
//         className="left-0 mt-[130px] bg-transparant"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? (
//           <Tooltip content="Hide the menu" placement="bottom">
//             <p className="bg-white text-gray-500 p-1 rounded-r-lg py-4 cursor-pointer text-sm shadow-lg">
//               <FaAnglesLeft />
//             </p>
//           </Tooltip>
//         ) : (
//           <Tooltip content="Show the menu" placement="bottom">
//             <p className="bg-white text-gray-500 p-1 rounded-r-lg py-4 cursor-pointer text-sm shadow-lg">
//               <FaAnglesRight />
//             </p>
//           </Tooltip>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SidebarMenu;
