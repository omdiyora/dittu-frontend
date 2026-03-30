// "use client";
// import { Button, Input } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import * as Yup from "yup";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useEffect, useState } from "react";
// import { useStore } from "@/lib/zustand/store";
// import { userChangePram } from "@/modules/Auth/interfaces";
// import { useSession } from "next-auth/react";
// import jwt from "jsonwebtoken";
// import { FaEyeSlash } from "react-icons/fa6";
// import { TbEyeFilled } from "react-icons/tb";

// const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(8, "Minimum 8 characters required")
//     .required("Password Is Required"),
//   confirmpassword: Yup.string()
//     .required("Confirm Password Is Required")
//     .oneOf([Yup.ref("password")], "Passwords must match"),
// });

// function ChangePassword() {
//   const {
//     userChangePassword,
//     changePasswordError,
//     changePasswordcred,
//     getUserAccounts,
//   } = useStore((s) => s);

//   const [changePasswordSent, setChangePasswordSent] = useState<string | null>(
//     null
//   );
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [userDetails, setUserDetails] = useState<any>("");
//   const [error, setError] = useState<any>("");
//   const [isVisible, setIsVisible] = useState(false);
//   const [isVisibleNPassword, setIsVisibleNPassword] = useState(false);
//   const [isVisibleCPassword, setIsVisibleCPassword] = useState(false);

//   const router = useRouter();
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (changePasswordcred) {
//       router.push("/");
//     }
//   }, [changePasswordcred]);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const res: any = await getUserAccounts(session?.user.id);
//         if (res) {
//           setUserDetails(res);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const passwordDecode: any = jwt.decode(userDetails?.password);

//   const toggleVisibility = () => setIsVisible(!isVisible);
//   const toggleVisibilityNPassword = () =>
//     setIsVisibleNPassword(!isVisibleNPassword);
//   const toggleVisibilityCPassword = () =>
//     setIsVisibleCPassword(!isVisibleCPassword);

//   const handleChangePassword = async (
//     email: any,
//     password: any,
//     oldPassword: any
//   ) => {
//     try {
//       const payload: userChangePram = { email, password };
//       let res;

//       if (oldPassword && passwordDecode?.password !== oldPassword) {
//         setError("Old Password Not Match. Please try again!");
//         return;
//       }

//       res = await userChangePassword(payload);

//       if (!(res as any)?.error) {
//         setChangePasswordSent("Password has been changed");
//         setErrorMessage(null); // Clear any previous error message
//       } else {
//         setChangePasswordSent(null); // Clear any success message
//         setErrorMessage((res as any).error); // Set the error message from the backend
//       }
//     } catch (error) {
//       console.error("Error submitting forget password form:", error);
//       setChangePasswordSent(null); // Clear any success message
//     }
//   };

//   const cancelPasswordHandler = () => {
//     router.push("/");
//   };

//   return (
//     <>
//       <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1   min-h-screen ">
//         <div className="lg:block md:block hidden bg-[url('/assets/images/login.png')] bg-cover bg-no-repeat">
//           {" "}
//         </div>
//         <div className="flex justify-center items-center flex-col bg-white">
//           <div className="text-center">
//             <img src="/assets/images/logo.png" width={"auto"} />
//             <div className="font-bold nunito-bold text-xl mt-8 text-[#001F3F]">
//               <div>Welcome. Please enter your</div>
//               <div>reset password below.</div>
//             </div>
//           </div>

//           <Formik
//             initialValues={{
//               oldPassword: "",
//               password: "",
//               confirmpassword: "",
//             }}
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//               const email = session?.user?.email;
//               const password = values.password;
//               const oldPassword = values.oldPassword;

//               handleChangePassword(email, password, oldPassword);
//             }}
//           >
//             {({ handleChange }) => (
//               <div className="mt-5 lg:w-1/2 md:w-9/12 w-10/12">
//                 <Form>
//                   {changePasswordError ? (
//                     <div className="text-red-700">{changePasswordError}</div>
//                   ) : null}
//                   <div className="mt-5">
//                     <Input
//                       type={isVisible ? "text" : "password"}
//                       label="Old Password"
//                       className="border-0 focus:border-none"
//                       style={{ border: "unset", backgroundColor: "none" }}
//                       name="oldPassword"
//                       onChange={handleChange}
//                       endContent={
//                         <button
//                           className="focus:outline-none"
//                           type="button"
//                           onClick={toggleVisibility}
//                         >
//                           {isVisible ? (
//                             <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                           ) : (
//                             <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
//                           )}
//                         </button>
//                       }
//                     />
//                     <span className="text-red-500 text-sm">{error}</span>
//                   </div>
//                   <div className="mt-5">
//                     <Input
//                       type={isVisibleNPassword ? "text" : "password"}
//                       label="New Password"
//                       className="border-0 focus:border-none"
//                       style={{ border: "unset", backgroundColor: "none" }}
//                       name="password"
//                       onChange={handleChange}
//                       endContent={
//                         <button
//                           className="focus:outline-none"
//                           type="button"
//                           onClick={toggleVisibilityNPassword}
//                         >
//                           {isVisibleNPassword ? (
//                             <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                           ) : (
//                             <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
//                           )}
//                         </button>
//                       }
//                     />
//                     <ErrorMessage
//                       component={"p"}
//                       name="password"
//                       className="text-red-500  text-sm"
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <Input
//                       type={isVisibleCPassword ? "text" : "password"}
//                       label="Confirm Password"
//                       className="border-0 focus:border-none"
//                       style={{ border: "unset", backgroundColor: "none" }}
//                       name="confirmpassword"
//                       onChange={handleChange}
//                       endContent={
//                         <button
//                           className="focus:outline-none"
//                           type="button"
//                           onClick={toggleVisibilityCPassword}
//                         >
//                           {isVisibleCPassword ? (
//                             <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                           ) : (
//                             <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
//                           )}
//                         </button>
//                       }
//                     />
//                     <ErrorMessage
//                       component={"p"}
//                       name="confirmpassword"
//                       className="text-red-500  text-sm"
//                     />
//                   </div>

//                   <div className="flex flex-wrap justify-center gap-4 items-center my-3">
//                     <Button
//                       color="primary"
//                       className=" my-5"
//                       size="lg"
//                       variant="ghost"
//                       onClick={cancelPasswordHandler}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       color="primary"
//                       className=" my-5"
//                       size="lg"
//                       type="submit"
//                     >
//                       Change password
//                     </Button>
//                   </div>
//                 </Form>
//               </div>
//             )}
//           </Formik>
//           {changePasswordSent && !changePasswordError && (
//             <p className="text-green-500">{changePasswordSent}</p>
//           )}
//           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ChangePassword;
