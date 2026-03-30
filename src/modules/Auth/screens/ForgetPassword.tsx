// "use client";
// import { Button, Input } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import * as Yup from "yup";
// import React, { useCallback, useEffect, useState } from "react";
// import { ErrorMessage, Field, Form, Formik } from "formik";

// import Link from "next/link";
// import { userForgetPram } from "@/modules/Auth/interfaces";
// import { useStore } from "@/lib/zustand/store";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Required"),
// });

// function ForgetPassword() {
//   const { userForgetPassword, forgetPasswordError, forgetcred } = useStore(
//     (s) => s
//   );
//   // const [resetPasswordSent, setResetPasswordSent] = useState<string>("");
//   const [resetPasswordSent, setResetPasswordSent] = useState<string | null>(
//     null
//   );
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const router = useRouter();

//   // useEffect(() => {
//   //   if (forgetcred) {
//   //     router.push("/login/reset-password");
//   //   }
//   // }, [forgetcred]);

//   // useEffect(() => {
//   //   // Check if forgetcred exists and set the state accordingly
//   //   if (forgetcred) {
//   //     // setResetPasswordSent(true); // Set resetPasswordSent to true
//   //     setResetPasswordSent("Reset password link sent successfully!");
//   //   }
//   // }, [forgetcred]); // Run this effect whenever forgetcred changes

//   const handleForgetPassword = async (payload: userForgetPram) => {

//     try {
//       const res = await userForgetPassword(payload);
//       if (!(res as any)?.error) {
//         setResetPasswordSent("Please check the inbox of the email for the reset password link!");
//         setErrorMessage(null); // Clear any previous error message
//       } else {
//         setResetPasswordSent(null); // Clear any success message
//         setErrorMessage((res as any).error); // Set the error message from the backend
//       }
//     } catch (error) {
//       console.error("Error submitting forget password form:", error);
//       setResetPasswordSent(null); // Clear any success message

//     }
//   };

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
//               <div>email address below.</div>
//             </div>
//           </div>

//           <Formik
//             initialValues={{
//               email: "",
//             }}
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//               handleForgetPassword({ email: values.email });
//             }}
//           >
//             {({ errors, touched, handleChange }) => (
//               <div className="mt-5 lg:w-1/2 md:w-9/12 w-10/12">
//                 <Form>
//                   <div className="mt-5">
//                     <Input
//                       type="email"
//                       label="Email Address"
//                       className="border-0 focus:border-none nunito-regular"
//                       style={{ border: "unset", backgroundColor: "none" }}
//                       name="email"
//                       onChange={handleChange}
//                     />
//                     <ErrorMessage
//                       component={"p"}
//                       name="email"
//                       className="text-red-500  text-sm"
//                     />
//                   </div>
//                   {forgetPasswordError ? (
//                     <div className="text-red-700">{forgetPasswordError}</div>
//                   ) : null}
//                   <div className="mt-4">
//                     <Button
//                       color="primary"
//                       className="w-full my-5 nunito-regular"
//                       size="lg"
//                       type="submit"
//                     >
//                       Forget Password
//                     </Button>
//                   </div>
//                 </Form>
//               </div>
//             )}
//           </Formik>
//           {/* {resetPasswordSent && ( // Render the message if resetPasswordSent is true
//             <p className="text-green-500">
//               Reset password link sent successfully!
//             </p>
//           )} */}
//           {resetPasswordSent && !forgetPasswordError && (
//             <p className="text-black">{resetPasswordSent}</p>
//           )}
//           {errorMessage && (
//             <p className="text-red-500">{errorMessage}</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ForgetPassword;
