// "use client";
// import { Button, Input } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import * as Yup from "yup";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useStore } from "@/lib/zustand/store";
// import { userResetPasswordvalues } from "@/modules/Auth/interfaces";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { FaEyeSlash } from "react-icons/fa6";
// import { TbEyeFilled } from "react-icons/tb";
// import { useSnackbar } from "notistack";
// import { generalNotification } from "@/constants/notificationTemplate";

// const validationSchema = Yup.object().shape({
//   identifier: Yup.string().required("Username or Email Is Required"),
//   password: Yup.string()
//     .min(8, "Minimum 8 characters required")
//     .required("Password Is Required"),
//   confirmpassword: Yup.string()
//     .required("Confirm Password Is Required")
//     .oneOf([Yup.ref("password")], "Passwords must match"),
// });

// function ResetPassword() {
//   const { enqueueSnackbar } = useSnackbar();
//   const { resetPasswordcred, resetPasswordError, createUserResetPassword, userLogin } =
//     useStore((s) => s);
//   const searchParams = useSearchParams();
//   const [isVisibleNPassword, setIsVisibleNPassword] = useState(false);
//   const [isVisibleCPassword, setIsVisibleCPassword] = useState(false);
//   const router = useRouter();
//   useEffect(() => {
//     if (resetPasswordcred) {
//       router.push("/login");
//     }
//   }, [resetPasswordcred]);

//   const handleResetPassword = async (payload: any) => {
//     try {
//       const data = {
//         email: payload.email,
//         password: payload.password,
//       };

//       const res = await createUserResetPassword(data);
//       if ((res as any).status === 200) {
//         enqueueSnackbar(generalNotification.RESET_PASSWORD_MESSAGE, {
//           variant: "success",
//           anchorOrigin: {
//             vertical: "top",
//             horizontal: "right",
//           },
//           autoHideDuration: 2000, // milliseconds
//         });
//         router.push("/login");
//       }
//     } catch (error) {
//       enqueueSnackbar(generalNotification.ERROR_MESSAGE, {
//         variant: "error",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "right",
//         },
//         autoHideDuration: 2000,
//       });
//     }
//   };

//   const toggleVisibilityNPassword = () =>
//     setIsVisibleNPassword(!isVisibleNPassword);
//   const toggleVisibilityCPassword = () =>
//     setIsVisibleCPassword(!isVisibleCPassword);

//   return (
//     <>
//       <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 min-h-screen ">
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
//               password: "",
//               confirmpassword: "",
//               identifier: "",
//             }}
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//               handleResetPassword({
//                 password: values.password,
//                 email: values.identifier,
//               });
//             }}
//           >
//             {({ handleChange }) => (
//               <div className="mt-5 lg:w-1/2 md:w-9/12 w-10/12">
//                 <Form>
//                   <div className="mt-5">
//                     <Input
//                       type="identifier"
//                       label="Username or Email Address"
//                       className="border-0 focus:border-none nunito-regular"
//                       style={{ border: "unset", backgroundColor: "none" }}
//                       name="identifier"
//                       onChange={handleChange}
//                     />
//                     <ErrorMessage
//                       component={"p"}
//                       name="identifier"
//                       className="text-red-500  text-sm"
//                     />
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
//                   {resetPasswordError ? (
//                     <div className="text-red-700">{resetPasswordError}</div>
//                   ) : null}
//                   <div className="mt-4">
//                     <Button
//                       color="primary"
//                       className="w-full my-5"
//                       size="lg"
//                       type="submit"
//                     >
//                       Reset password
//                     </Button>
//                   </div>
//                 </Form>
//               </div>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ResetPassword;
