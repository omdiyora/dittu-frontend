// "use client";
// import {
//   Button,
//   Input,
//   Avatar,
//   Spinner,
//   Tabs,
//   Tab,
//   Card,
//   CardBody,
//   CardHeader,
//   Textarea,
// } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import { ErrorMessage, Form, Formik } from "formik";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useStore } from "@/lib/zustand/store";
// import jwt from "jsonwebtoken";
// import * as Yup from "yup";
// import { FaEyeSlash } from "react-icons/fa6";
// import { TbEyeFilled } from "react-icons/tb";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { AiOutlineDelete } from "react-icons/ai";
// import { IoArrowBackOutline } from "react-icons/io5";
// import { useSnackbar } from "notistack";
// import { generalNotification } from "@/constants/notificationTemplate";

// const validationSchema = Yup.object().shape({
//   oldPassword: Yup.string().required("Current Password is required"),
//   newPassword: Yup.string()
//     .min(8, "Minimum 8 characters required")
//     .required("New Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("newPassword")], "Passwords must match")
//     .required("Confirm Password is required"),
// });

// function UserSetting() {

//   const getCurrentUserApplicant = useStore((s) => s.getCurrentUserApplicant);
//   const currentUserApplicantData = useStore((s) => s.currentUserApplicantData);
//   const updateUserAccounts = useStore((s) => s.updateUserAccounts);
//   const uploadDocument = useStore((s) => s.uploadDocument);

//   let tabs = [
//     {
//       id: "profile",
//       label: "Edit Profile",
//       content: "",
//     },
//     {
//       id: "password",
//       label: "Change Password",
//       content: "",
//     },
//   ];
//   const { enqueueSnackbar } = useSnackbar();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [fileName, setFileName] = useState<any>("");
//   const [error, setError] = useState<any>("");
//   const [userDetails, setUserDetails] = useState<any>(currentUserApplicantData);

//   console.log(userDetails, 'userDetails');


//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [fileInputKey, setFileInputKey] = useState<string>(
//     Date.now().toString()
//   );
//   const [isVisible, setIsVisible] = useState(false);
//   const [isVisibleNPassword, setIsVisibleNPassword] = useState(false);
//   const [isVisibleCPassword, setIsVisibleCPassword] = useState(false);
//   const [activeTab, setActiveTab] = useState<any>("profile");

//   const router = useRouter();
//   const { data: session } = useSession();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (session?.user.id) {
//         await getCurrentUserApplicant(session?.user.id);
//       }
//       setLoading(false);

//       const urlParams = new URLSearchParams(window.location.search);
//       const tabParam = urlParams.get("tab");
//       if (tabParam === "password") {
//         setActiveTab("password");
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {

//     if (currentUserApplicantData) {
//       setUserDetails(currentUserApplicantData);

//     }
//   }, [session, currentUserApplicantData]);

//   useEffect(() => {
//     if (session && session.user) {
//       getCurrentUserApplicant(session?.user?.id)
//     }
//   }, [session])


//   // const findCurrentUser = userApplicantDetails.find(
//   //   (data: any) => data.user_id === session?.user.id
//   // );

//   console.log(currentUserApplicantData, 'currentUserApplicantData');


//   const toBacklHandler = () => {
//     router.back();
//   };

//   const handleImageChange = async (e: any) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];

//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response: any = await uploadDocument(formData);
//         setFileName(response.data);
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById("profileImage")?.click();
//   };

//   const toggleVisibility = () => setIsVisible(!isVisible);
//   const toggleVisibilityNPassword = () =>
//     setIsVisibleNPassword(!isVisibleNPassword);
//   const toggleVisibilityCPassword = () =>
//     setIsVisibleCPassword(!isVisibleCPassword);

//   const handleRemoveImage = async () => {
//     try {
//       const updatedValues = {
//         ...userDetails,
//         profile_image: "",
//       };
//       const res: any = await updateUserAccounts(updatedValues);
//       enqueueSnackbar(generalNotification.PROFILE_UPDATED_MESSAGE, {
//         variant: "success",
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "right",
//         },
//         autoHideDuration: 2000, // milliseconds
//       });
//       if (res?.status === 200) {
//         if (session?.user.id) {
//           getCurrentUserApplicant(session?.user.id);
//         }
//         setFileName("");
//       }
//     } catch (error) { }
//   };

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spinner
//           label="Loading..."
//           color="primary"
//           labelColor="primary"
//           size="lg"
//         />
//       </div>
//     );
//   }

//   const passwordDecode: any = jwt.decode(userDetails?.password);

//   return (
//     <div className=" h-screen nunito-regular">
//       <div className="flex">
//         <div className="cursor-pointer pt-5 ml-5 flex" onClick={toBacklHandler}>
//           <IoArrowBackOutline size={30} />{" "}
//           <div
//             className="ml-2 nunito-regular"
//             style={{ marginTop: "-1px", fontSize: "23px" }}
//           >
//             My Account
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <div className="w-2/4 flex flex-col mt-4">
//           <Tabs
//             aria-label="Dynamic tabs"
//             items={tabs}
//             selectedKey={activeTab}
//             onSelectionChange={(key: any) => setActiveTab(key)}
//           >
//             {(item) => (
//               <Tab key={item.id} title={item.label}>
//                 <Card>
//                   <CardBody>
//                     {item.id === "profile" ? (
//                       <Formik
//                         enableReinitialize
//                         initialValues={{
//                           firstName: userDetails?.first_name || "",
//                           lastName: userDetails?.last_name || "",
//                           email: userDetails?.email || "",
//                           mobile: userDetails?.telephone || "",
//                           oldPassword: "",
//                           newPassword: "",
//                           confirmPassword: "",
//                         }}
//                         // validationSchema={validationSchema}
//                         onSubmit={async (values) => {
//                           try {
//                             if (values.oldPassword) {
//                               if (
//                                 passwordDecode?.password !== values.oldPassword
//                               ) {
//                                 setError(
//                                   "Current Password Not Match.Please try again..!"
//                                 );
//                               } else {
//                                 const updatedValues = {
//                                   ...userDetails,
//                                   first_name: values.firstName,
//                                   last_name: values.lastName,
//                                   mobile_number: values.mobile,
//                                   id: userDetails.id,
//                                   profile_image:
//                                     fileName || userDetails?.profile_image,
//                                   password:
//                                     values.newPassword ||
//                                     passwordDecode?.password,
//                                 };
//                                 const res: any =
//                                   await updateUserAccounts(
//                                     updatedValues
//                                   );
//                                 enqueueSnackbar(
//                                   generalNotification.PROFILE_UPDATED_MESSAGE,
//                                   {
//                                     variant: "success",
//                                     anchorOrigin: {
//                                       vertical: "top",
//                                       horizontal: "right",
//                                     },
//                                     autoHideDuration: 2000, // milliseconds
//                                   }
//                                 );
//                                 if (res?.status === 200) {
//                                   const res: any = await getCurrentUserApplicant(
//                                     session?.user.id
//                                   );
//                                   if (res) {
//                                     setUserDetails(res);
//                                   }
//                                   if (session?.user.id) {
//                                     getCurrentUserApplicant(session?.user.id);
//                                   }
//                                 }
//                               }
//                             } else {
//                               const updatedValues = {
//                                 ...userDetails,
//                                 first_name: values.firstName,
//                                 last_name: values.lastName,
//                                 mobile_number: values.mobile,
//                                 id: userDetails.id,
//                                 profile_image:
//                                   fileName || userDetails?.profile_image,
//                                 password:
//                                   values.newPassword ||
//                                   passwordDecode?.password,
//                               };
//                               const res: any = await updateUserAccounts(
//                                 updatedValues
//                               );
//                               enqueueSnackbar(
//                                 generalNotification.PROFILE_UPDATED_MESSAGE,
//                                 {
//                                   variant: "success",
//                                   anchorOrigin: {
//                                     vertical: "top",
//                                     horizontal: "right",
//                                   },
//                                   autoHideDuration: 2000, // milliseconds
//                                 }
//                               );
//                               if (res?.status === 200) {
//                                 if (session?.user.id) {
//                                   getCurrentUserApplicant(session?.user.id);
//                                 }
//                               }
//                             }
//                           } catch (error) {
//                             setErrorMessage(
//                               "Failed to update details. Please try again."
//                             );
//                             console.error("Update failed:", error);
//                           }
//                         }}
//                       >
//                         {({
//                           handleChange,
//                           handleSubmit,
//                           values,
//                           setFieldValue,
//                         }) => (
//                           <div className="mt-5 w-full">
//                             <Form onSubmit={handleSubmit}>
//                               <div className="mt-5 flex ml-8">
//                                 <div className="mt-2 flex flex-col items-center">
//                                   {/* <Avatar
//                                     showFallback
//                                     src={
//                                       userDetails?.profile_image ||
//                                       fileName ||
//                                       "https://images.unsplash.com/broken"
//                                     }
//                                     className="w-32 h-32 text-large"
//                                   /> */}
//                                   <Avatar
//                                     showFallback
//                                     // src={
//                                     //   userDetails?.profile_image ||
//                                     //   fileName ||
//                                     //   "https://images.unsplash.com/broken"
//                                     // }
//                                     fallback={`${currentUserApplicantData?.first_name[0] ?? ""}${currentUserApplicantData?.last_name[0] ?? ""
//                                       }`.toUpperCase()}
//                                     className="w-32 h-32 text-[54px] text-blue-600 bg-blue-100 flex items-center justify-center rounded-full"
//                                   />
//                                 </div>
//                                 <div className="ml-9 mt-8">
//                                   <label className="block text-sm text-gray-700 font-bold nunito-bold	">
//                                     Your avatar
//                                   </label>
//                                   <label className="block text-sm font-medium nunito-bold text-gray-700">
//                                     PNG, JPG, GIF or JPEG
//                                   </label>
//                                   <input
//                                     type="file"
//                                     accept="image/png, image/jpeg, image/gif"
//                                     id="profileImage"
//                                     style={{ display: "none" }}
//                                     onChange={(e) => handleImageChange(e)}
//                                   />
//                                   <div className="flex mt-2">
//                                     <Button
//                                       isIconOnly
//                                       color="default"
//                                       aria-label="Like"
//                                       size="md"
//                                       className="ml-1 rounded-lg bg-[#f6f6f6]"
//                                       onClick={triggerFileInput}
//                                     >
//                                       <IoCloudUploadOutline />
//                                     </Button>
//                                     <Button
//                                       isIconOnly
//                                       color="default"
//                                       aria-label="Like"
//                                       size="md"
//                                       className="ml-1 rounded-lg bg-[#f6f6f6]"
//                                       onClick={handleRemoveImage}
//                                     >
//                                       <AiOutlineDelete />
//                                     </Button>
//                                   </div>
//                                   <ErrorMessage
//                                     component="p"
//                                     name="profileImage"
//                                     className="text-red-500 text-sm"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="text-sm mb-2 ml-2 mt-6 pl-4">
//                                 <div
//                                   className="flex items-center space-x-4"
//                                   style={{ width: "92%" }}
//                                 >
//                                   <div className="flex-1">
//                                     <label className="block mb-2">
//                                       First Name
//                                     </label>
//                                     <Textarea
//                                       name="firstName"
//                                       variant="bordered"
//                                       placeholder="Enter first name"
//                                       disableAutosize
//                                       classNames={{
//                                         base: "w-full h-14",
//                                         input: "pt-2",
//                                       }}
//                                       onChange={handleChange}
//                                       value={values.firstName}
//                                     />
//                                     <ErrorMessage
//                                       name="firstName"
//                                       component={"p"}
//                                       className="text-red-500 text-sm mt-2"
//                                     />
//                                   </div>
//                                   <div className="flex-1">
//                                     <label className="block mb-2">
//                                       Last Name
//                                     </label>
//                                     <Textarea
//                                       name="lastName"
//                                       variant="bordered"
//                                       placeholder="Enter last name"
//                                       disableAutosize
//                                       classNames={{
//                                         base: "w-full h-14",
//                                         input: "pt-2",
//                                       }}
//                                       onChange={handleChange}
//                                       value={values.lastName}
//                                     />
//                                     <ErrorMessage
//                                       name="lastName"
//                                       component={"p"}
//                                       className="text-red-500 text-sm mt-2"
//                                     />
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="text-sm mb-2 ml-2 mt-6 pl-4">
//                                 <div
//                                   className="flex items-center space-x-4"
//                                   style={{ width: "92%" }}
//                                 >
//                                   <div className="flex-1">
//                                     <label className="block mb-2">
//                                       Email Address
//                                     </label>
//                                     <Textarea
//                                       name="email"
//                                       variant="bordered"
//                                       placeholder="Enter email address"
//                                       disableAutosize
//                                       classNames={{
//                                         base: "w-full h-14",
//                                         input: "pt-2",
//                                       }}
//                                       onChange={handleChange}
//                                       value={values.email}
//                                       readOnly={true}
//                                     />
//                                     <ErrorMessage
//                                       name="email"
//                                       component={"p"}
//                                       className="text-red-500 text-sm mt-2"
//                                     />
//                                   </div>
//                                   <div className="flex-1">
//                                     <label className="block mb-2">
//                                       Mobile Phone
//                                     </label>
//                                     <Textarea
//                                       name="mobile"
//                                       variant="bordered"
//                                       placeholder="Enter Mobile Phone"
//                                       disableAutosize
//                                       classNames={{
//                                         base: "w-full h-14",
//                                         input: "pt-2",
//                                       }}
//                                       onChange={handleChange}
//                                       value={values.mobile}
//                                     />
//                                     <ErrorMessage
//                                       name="mobile"
//                                       component={"p"}
//                                       className="text-red-500 text-sm mt-2"
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="text-sm mb-2 ml-2 mt-6 pl-4">
//                                 <div
//                                   className="flex items-center space-x-4"
//                                   style={{ width: "92%" }}
//                                 >
//                                   <div className="flex-1">
//                                     <Button
//                                       color="primary"
//                                       className="my-5"
//                                       size="lg"
//                                       type="submit"
//                                     >
//                                       Update Profile
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </Form>
//                           </div>
//                         )}
//                       </Formik>
//                     ) : item.id === "password" ? (
//                       <>
//                         <Formik
//                           initialValues={{
//                             oldPassword: "",
//                             newPassword: "",
//                             confirmPassword: "",
//                           }}
//                           validationSchema={validationSchema}
//                           onSubmit={async (values) => {
//                             try {
//                               if (values.oldPassword) {
//                                 if (
//                                   passwordDecode?.password !==
//                                   values.oldPassword
//                                 ) {
//                                   setError(
//                                     "Old Password Not Match.Please try again..!"
//                                   );
//                                 } else {
//                                   const updatedValues = {
//                                     ...userDetails,
//                                     id: userDetails.id,
//                                     password:
//                                       values.newPassword ||
//                                       passwordDecode?.password,
//                                   };
//                                   const res: any =
//                                     await updateUserAccounts(
//                                       updatedValues
//                                     );
//                                   enqueueSnackbar(
//                                     generalNotification.PROFILE_UPDATED_MESSAGE,
//                                     {
//                                       variant: "success",
//                                       anchorOrigin: {
//                                         vertical: "top",
//                                         horizontal: "right",
//                                       },
//                                       autoHideDuration: 2000, // milliseconds
//                                     }
//                                   );
//                                   if (res?.status === 200) {
//                                     if (session?.user.id) {
//                                       getCurrentUserApplicant(session?.user.id);
//                                     }
//                                   }
//                                 }
//                               } else {
//                                 const updatedValues = {
//                                   ...userDetails,
//                                   id: userDetails.id,
//                                   password:
//                                     values.newPassword ||
//                                     passwordDecode?.password,
//                                 };
//                                 const res: any =
//                                   await updateUserAccounts(
//                                     updatedValues
//                                   );
//                                 enqueueSnackbar(
//                                   generalNotification.PROFILE_UPDATED_MESSAGE,
//                                   {
//                                     variant: "success",
//                                     anchorOrigin: {
//                                       vertical: "top",
//                                       horizontal: "right",
//                                     },
//                                     autoHideDuration: 2000, // milliseconds
//                                   }
//                                 );

//                                 if (res?.status === 200) {
//                                   if (session?.user.id) {
//                                     getCurrentUserApplicant(session?.user.id);
//                                   }
//                                 }
//                               }
//                             } catch (error) {
//                               setErrorMessage(
//                                 "Failed to update details. Please try again."
//                               );
//                               console.error("Update failed:", error);
//                             }
//                           }}
//                         >
//                           {({
//                             handleChange,
//                             handleSubmit,
//                             values,
//                             setFieldValue,
//                           }) => (
//                             <div className="mt-5 w-full">
//                               <Form onSubmit={handleSubmit}>
//                                 <div className="w-11/12	m-auto mt-2">
//                                   <label className="block mb-2 nunito-regular">
//                                     Current Password
//                                   </label>
//                                   <Input
//                                     type={isVisible ? "text" : "password"}
//                                     name="oldPassword"
//                                     variant="bordered"
//                                     placeholder="Enter Current Password"
//                                     classNames={{
//                                       base: "w-full",
//                                       input: "py-4",
//                                     }}
//                                     onChange={handleChange}
//                                     value={values.oldPassword}
//                                     endContent={
//                                       <button
//                                         className="focus:outline-none"
//                                         type="button"
//                                         onClick={toggleVisibility}
//                                       >
//                                         {isVisible ? (
//                                           <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                                         ) : (
//                                           <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
//                                         )}
//                                       </button>
//                                     }
//                                   />
//                                   <ErrorMessage
//                                     name="oldPassword"
//                                     component={"p"}
//                                     className="text-red-500 text-sm mt-2"
//                                   />
//                                 </div>
//                                 <div className="w-11/12	m-auto mt-2">
//                                   <label className="block mb-2">
//                                     New Password
//                                   </label>
//                                   <Input
//                                     type={
//                                       isVisibleNPassword ? "text" : "password"
//                                     }
//                                     name="newPassword"
//                                     variant="bordered"
//                                     placeholder="Enter New Password"
//                                     classNames={{
//                                       base: "w-full",
//                                       input: "py-4",
//                                     }}
//                                     onChange={handleChange}
//                                     value={values.newPassword}
//                                     endContent={
//                                       <button
//                                         className="focus:outline-none"
//                                         type="button"
//                                         onClick={toggleVisibilityNPassword}
//                                       >
//                                         {isVisibleNPassword ? (
//                                           <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                                         ) : (
//                                           <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
//                                         )}
//                                       </button>
//                                     }
//                                   />
//                                   <ErrorMessage
//                                     name="newPassword"
//                                     component={"p"}
//                                     className="text-red-500 text-sm mt-2"
//                                   />
//                                 </div>
//                                 <div className="w-11/12	m-auto mt-2">
//                                   <label className="block mb-2">
//                                     Re-type New Password
//                                   </label>
//                                   <Input
//                                     name="confirmPassword"
//                                     variant="bordered"
//                                     placeholder="Enter your Re-type New Password"
//                                     endContent={
//                                       <button
//                                         className="focus:outline-none m-auto"
//                                         type="button"
//                                         onClick={toggleVisibilityCPassword}
//                                       >
//                                         {isVisibleCPassword ? (
//                                           <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                                         ) : (
//                                           <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
//                                         )}
//                                       </button>
//                                     }
//                                     type={
//                                       isVisibleCPassword ? "text" : "password"
//                                     }
//                                     classNames={{
//                                       base: "w-full",
//                                       input: "py-4",
//                                     }}
//                                     onChange={handleChange}
//                                     value={values.confirmPassword}
//                                   />
//                                   <ErrorMessage
//                                     name="confirmPassword"
//                                     component={"p"}
//                                     className="text-red-500 text-sm mt-2"
//                                   />
//                                 </div>
//                                 {error && (
//                                   <p className="text-red-500">{error}</p>
//                                 )}
//                                 <div className="w-11/12	m-auto">
//                                   <Button
//                                     color="primary"
//                                     className="my-5 nunito-regular"
//                                     size="lg"
//                                     type="submit"
//                                   >
//                                     Change Password
//                                   </Button>
//                                 </div>
//                               </Form>
//                             </div>
//                           )}
//                         </Formik>
//                       </>
//                     ) : (
//                       item.content
//                     )}
//                   </CardBody>
//                 </Card>
//               </Tab>
//             )}
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserSetting;
