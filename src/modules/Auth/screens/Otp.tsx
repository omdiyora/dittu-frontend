// "use client";
// import OtpInput from "@/components/FormInput/OtpInput";
// import { Button, Spinner } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import React, { useCallback, useEffect, useState } from "react";
// import { signIn, useSession } from "next-auth/react";
// import { useStore } from "@/lib/zustand/store";
// import { InputOtp } from "@heroui/react";
// import { getCsrfToken } from "next-auth/react";
// import { getBrowserName, getClientIP } from "@/helpers/clientIP";
// import { useSnackbar } from "notistack";

// export default function OtpForm() {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();
//   const [otp, setOtp] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [otpError, setOtpError] = useState<string | null>(null);
//   const [typing, setTyping] = useState<boolean>(false);
//   const { loginCred, userLogin, createAuditLogs } = useStore((m) => m);
//   const [minutes, setMinutes] = useState(3);
//   const [seconds, setSeconds] = useState(0);
//   const [resendClicked, setResendClicked] = useState(false);
//   const { data: session } = useSession();
//   const assessment_framework_id = session?.user.assessment_framework_id?.[0];

//   useEffect(() => {
//     if (!loginCred) {
//       router.push("/login");
//     }
//   }, [loginCred]);

//   useEffect(() => {
//     if (session?.user.account_status === 'Inactive') {
//       // enqueueSnackbar("Your user account is disabled. Please contact your administrator.", {
//       //   variant: "error",
//       //   anchorOrigin: {
//       //     vertical: "top",
//       //     horizontal: "right",
//       //   },
//       //   autoHideDuration: 3500,
//       // });
//       return router.push("/login");
//     }
//     if (session?.user && session?.user.account_status === 'Active') {
//       if (['1', '2', '3'].includes(session?.user.risk_role_id?.toString())
//       ) {
//         router.push("/risk/dashboard");
//       }
//       if (['1', '2', '3'].includes(session?.user.incident_role_id?.toString())) {
//         router.push("/incident/dashboard");
//       }
//       if (['1', '2', '3'].includes(session?.user.audit_role_id?.toString())) {
//         router.push("/");
//       } else {
//         router.push("/");
//       }
//     }
//   }, [session]);

//   const handleClick = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const res = await signIn("credentials", {
//         email: loginCred?.identifier,
//         otp: otp,
//         user_agent: navigator.userAgent,
//         ip_address: await getClientIP(),
//         portal_name: "Certification Assessment Portal",
//         redirect: false,
//       });
//       localStorage.removeItem("userEmail");
//       if (res?.error) {
//         setOtp("");
//         setTyping(false);
//         throw new Error(res.error);
//       }

//       // Fetch fresh session after OTP verification
//       const updatedSession = await fetch("/api/auth/session").then((r) => r.json());

//       if (updatedSession?.user?.account_status === "Inactive") {
//         enqueueSnackbar("Your user account is disabled. Please contact your administrator.", {
//           variant: "error",
//           anchorOrigin: { vertical: "top", horizontal: "right" },
//           autoHideDuration: 3500,
//         });

//         // Force sign out and redirect
//         await signIn("credentials", { redirect: false }); // clear auth cookie
//         router.push("/login");
//         return;
//       }

//       // Audit log for success
//       const auditData = {
//         user_id: updatedSession?.user.id,
//         client_organisation_id:
//           updatedSession?.user.grc_client_organization_id || updatedSession?.user.client_organization_id,
//         module_name: "Portal Login",
//         action: "Login Otp",
//         action_status: "Success",
//         record_table_name: "users",
//         ip_address: await getClientIP(),
//         user_agent: navigator.userAgent,
//         source: "Web Portal",
//         user: loginCred?.identifier,
//       };
//       await createAuditLogs(auditData);

//     } catch (error: any) {
//       console.error("Error during sign-in:", error.message);

//       // Audit log for failure
//       const auditData = {
//         user_id: session?.user.id,
//         client_organisation_id: session?.user.grc_client_organization_id || session?.user.client_organization_id,
//         module_name: "Portal Login",
//         action: "Login Otp",
//         action_status: "Failed",
//         record_table_name: "users",
//         ip_address: await getClientIP(),
//         user_agent: navigator.userAgent,
//         source: "Web Portal",
//         user: loginCred?.identifier,
//       };
//       await createAuditLogs(auditData);

//       setOtp("");
//       setOtpError("Failed to sign in. Please check your credentials and try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [otp, loginCred?.identifier]);


//   const handleChange = (newArr: any) => {
//     setOtp(newArr);
//     setTyping(true); // Set typing to true when the user starts typing
//     setOtpError(null); // Hide the error message when the user starts typing
//   };


//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }

//       if (seconds === 0) {
//         if (minutes === 0) {
//           clearInterval(interval);
//         } else {
//           setSeconds(59);
//           setMinutes(minutes - 1);
//         }
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [seconds, minutes]);

//   const handleOtpResendClick = () => {
//     if (loginCred) userLogin(loginCred);
//     setResendClicked(true);
//     setMinutes(3); // Reset minutes to 3
//     setSeconds(0); // Reset seconds to 0
//   };

//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === "Enter") {
//       handleClick();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [handleKeyDown]);
//   const savedEmail = localStorage.getItem("userEmail");

//   const maskEmail = (email: string) => {
//     const [localPart, domain] = email.split("@");
//     if (localPart.length > 2) {
//       return `${localPart[0]}${"*".repeat(localPart.length - 2)}${localPart[localPart.length - 1]
//         }@${domain}`;
//     }
//     return email;
//   };
//   return (
//     <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 min-h-screen">
//       <div className="lg:block md:block hidden bg-[url('/assets/images/team.png')] bg-cover bg-no-repeat"></div>
//       <div className="flex justify-center items-center flex-col bg-white">
//         <div className="text-center">
//           <img src="/assets/images/logo.png" width={"auto"} />
//         </div>
//         <div className="bg-white p-6  w-full max-w-md text-center">
//           <h2 className="text-lg font-bold">Enter the code</h2>
//           <p className="text-black">
//             A verification code has been sent to <br />
//             <span className="font-semibold">
//               {savedEmail ? maskEmail(savedEmail) : ""}
//             </span>
//           </p>

//           <div className="flex justify-center items-center gap-2 mt-4">
//             <OtpInput
//               numberOfDigits={6}
//               handleChangeOtp={handleChange}
//               otpError={otpError}
//               setTyping={setTyping}
//               typing={typing}
//               resendClicked={resendClicked}
//               setResendClicked={setResendClicked}
//             />
//           </div>

//           <div className="flex  justify-between items-center w-full">
//             <div className="mt-4 text-center rounded-md text-sm font-semibold">
//               Code expires in: {minutes < 10 ? `0${minutes}` : minutes}:
//               {seconds < 10 ? `0${seconds}` : seconds}
//             </div>

//             <div
//               className="mt-3  text-center rounded-md text-sm font-semibold cursor-pointer text-[#0070f0]"
//               onClick={handleOtpResendClick}
//             >
//               Resend Code
//             </div>
//           </div>
//           <Button
//             color="primary"
//             className="w-full mt-5 py-2 text-white rounded-lg"
//             size="lg"
//             onClick={handleClick}
//             isDisabled={isLoading}
//           >
//             {!isLoading ? "Submit" : <Spinner color="white" />}
//           </Button>
//         </div>


//       </div>
//     </div>
//   );
// }
