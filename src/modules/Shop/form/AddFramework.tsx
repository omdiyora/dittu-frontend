// import React, { useState } from "react";
// import validationSchema from "./validationSchema";
// import { ErrorMessage, Form, Formik } from "formik";
// import { Button, Input, Textarea } from "@nextui-org/react";
// import { useStore } from "@/lib/zustand/store";
// import { Select, SelectItem } from "@nextui-org/react";
// import { IoIosArrowDropdown } from "react-icons/io";
// import { CiSquareCheck } from "react-icons/ci";
// import { HiBars3BottomLeft } from "react-icons/hi2";
// import { TbListNumbers } from "react-icons/tb";
// import { FaRegCircleDot } from "react-icons/fa6";
// import { useSession } from "next-auth/react";
// import { RadioGroup, Radio } from "@nextui-org/react";
// import { useSnackbar } from "notistack";
// import { generalNotification } from "@/constants/notificationTemplate";

// type Props = {
//   onSubmitSuccess?: () => void;
//   open: boolean;
//   setOpen: any;
//   updateData: any;
//   setUpdateData: any;
// };

// const AddFramework = ({
//   onSubmitSuccess,
//   open,
//   setOpen,
//   updateData,
//   setUpdateData,
// }: Props) => {
//     const { enqueueSnackbar } = useSnackbar();
//   const [dynamicFieldsData, setDynamicFieldsData] = useState(
//     updateData?.assessment_framework_fields?.map((field: any) =>
//       JSON.parse(field)
//     ) || []
//   );
//   const [dynamicFields, setDynamicFields] = useState<string[]>(
//     dynamicFieldsData?.map((field: any) => field.field) || []
//   );
//   const { data: session } = useSession();
//   const [showNewFieldInput, setShowNewFieldInput] = useState(false);
//   const [dynamicFieldName, setDynamicFieldName] = useState("");
//   const [dynamicFieldType, setDynamicFieldType] = useState("");
//   const [uploadFile, setUploadFile] = useState("");
//   const getAssessmentFrameworks: any = useStore(
//     (s) => s.getAssessmentFrameworks
//   );
//   const handleAddNewField = () => {
//     setShowNewFieldInput((prev) => !prev);
//   };
//   const AddAssessmentFrameWork = useStore((m) => m.AddAssessmentFrameWork);
//   const getAssessmentQuestionUploadData = useStore(
//     (m) => m.getAssessmentQuestionUploadData
//   );

//   const updateAssessmentFrameWork = useStore(
//     (m) => m.updateAssessmentFrameWork
//   );

//   const handleAddField = () => {
//     setDynamicFields((prev) => [...prev, dynamicFieldName]);
//     setDynamicFieldsData((prev: any) => [
//       ...prev,
//       { field: dynamicFieldName, value: dynamicFieldType },
//     ]);
//     setDynamicFieldName("");
//     setShowNewFieldInput(false);
//   };
//   const handleCancelUpdate = () => {
//     setUpdateData("");
//     setOpen(false);
//   };

//   const handleSave = async (input: any) => {
//     if (!updateData) {
//       const assessmentFrameworkFields = [];
//       const filteredInput: any = [];
//       for (const key in input) {
//         if (
//           input.hasOwnProperty(key) &&
//           ![
//             "assessment_name",
//             "assessment_description",
//             "assessment_version",
//             "accreditation_body",
//             "assessment_db_table",
//             "assessment_framework_status",
//           ].includes(key)
//         ) {
//           assessmentFrameworkFields.push({ field: key, value: input[key] });
//         } else {
//           filteredInput[key] = input[key];
//         }
//       }
//       const uniqueFields: any = {};
//       const assessmentFrameworkFieldsForFilter = [
//         ...dynamicFieldsData,
//         ...assessmentFrameworkFields,
//       ];
//       assessmentFrameworkFieldsForFilter.forEach((item) => {
//         uniqueFields[item.field] = item;
//       });

//       const uniqueArray = Object.values(uniqueFields);
//       const formattedInput = {
//         ...filteredInput,
//         assessment_framework_fields: uniqueArray,
//       };
//       const response = await AddAssessmentFrameWork(formattedInput);
//       if ((response as any)?.status === 201) {
//         const formData = new FormData();
//         // @ts-ignore

//         if (uploadFile) {
//           // @ts-ignore
//           formData.append("file", uploadFile);
//         }
//         // @ts-ignore
//         formData.append("assessment_id", response?.data.id);
//         const res = getAssessmentQuestionUploadData(formData);
//         enqueueSnackbar(generalNotification.SAVED_MESSAGE, {
//           variant: "success",
//           anchorOrigin: {
//             vertical: "top",
//             horizontal: "right",
//           },
//           autoHideDuration: 2000, // milliseconds
//         });
//         getAssessmentFrameworks(session?.user.id);
//         setOpen(false);
//       }
//     } else {
//       const assessmentFrameworkFields = [];
//       const filteredInput: any = [];
//       let assessmentFrameworkFieldsFor: any = [];
//       for (const key in input) {
//         if (
//           input.hasOwnProperty(key) &&
//           ![
//             "assessment_name",
//             "assessment_description",
//             "assessment_version",
//             "accreditation_body",
//             "assessment_db_table",
//             "assessment_framework_status",
//           ].includes(key)
//         ) {
//           assessmentFrameworkFieldsFor = [
//             ...dynamicFieldsData,
//             { field: key, value: input[key] },
//           ];
//           assessmentFrameworkFields.push({ field: key, value: input[key] });
//         } else {
//           filteredInput[key] = input[key];
//         }
//       }
//       const uniqueFields: any = {};
//       const assessmentFrameworkFieldsForFilter = [
//         ...dynamicFieldsData,
//         ...assessmentFrameworkFields,
//       ];
//       assessmentFrameworkFieldsForFilter.forEach((item) => {
//         uniqueFields[item.field] = item;
//       });

//       const uniqueArray = Object.values(uniqueFields);

//       const formattedInput = {
//         ...filteredInput,
//         assessment_framework_fields: uniqueArray,
//         id: updateData.id,
//       };
//       const response = await updateAssessmentFrameWork(formattedInput);
//       if ((response as any)?.status === 200) {
//         enqueueSnackbar(generalNotification.UPDATED_MESSAGE, {
//           variant: "success",
//           anchorOrigin: {
//             vertical: "top",
//             horizontal: "right",
//           },
//           autoHideDuration: 2000, // milliseconds
//         });
//         if (session) {
//           getAssessmentFrameworks(session?.user.id);
//         }

//         setOpen(false);
//       }
//     }
//   };

//   const handleFileChange = async (e: any) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setUploadFile(file);
//     }
//   };

//   const dynamicFieldAllTypes = [
//     { id: "text", name: "Short Answer", avatar: <HiBars3BottomLeft /> },
//     {
//       id: "uuid",
//       name: "Numberical Number (1-10)",
//       avatar: <TbListNumbers />,
//     },
//     { id: "uuid[]", name: "Multiple Choice", avatar: <FaRegCircleDot /> },
//     { id: "boolean", name: "Checkbox", avatar: <CiSquareCheck /> },
//     {
//       id: "caracter-varying",
//       name: "DropDown",
//       avatar: <IoIosArrowDropdown />,
//     },
//   ];

//   return (
//     <>
//       {open ? (
//         <div className="max-h-[70vh] overflow-y-auto">
//           <p className="text-[21px] font-semibold nunito-semibold border-b flex justify-between items-center bg-f6f6f6 px-8 h-20 rounded-md">
//             {updateData
//               ? "Edit Assessment Framework"
//               : "New Assessment Framework"}
//           </p>
//           <div className="pt-3 pb-8 flex justify-center w-full">
//             <Formik
//               initialValues={{
//                 assessment_name: updateData?.assessment_name || "",
//                 assessment_version: updateData?.assessment_version || null,
//                 assessment_description:
//                   updateData?.assessment_description || "",
//                 accreditation_body: updateData?.accreditation_body || "",
//                 assessment_db_table: updateData?.assessment_db_table || "",
//                 assessment_framework_status:
//                   updateData?.assessment_framework_status || "",
//               }}
//               validationSchema={validationSchema()}
//               onSubmit={handleSave}
//             >
//               {({ errors, touched, handleChange, values }) => (
//                 <div className="md:w-9/12 text-cente">
//                   <Form>
//                     <div className="text-sm mb-2 ml-2 mt-6">
//                       Assessment Name
//                       <Textarea
//                         name="assessment_name"
//                         variant="bordered"
//                         placeholder="Enter assessment name"
//                         disableAutosize
//                         classNames={{
//                           base: "w-full h-14 mt-2",
//                           input: "pt-2",
//                         }}
//                         onChange={handleChange}
//                         value={values.assessment_name}
//                       />
//                       <ErrorMessage
//                         name="email"
//                         component={"p"}
//                         className="text-red-500  text-sm"
//                       />
//                     </div>

//                     <div className="text-sm mb-2 ml-2 mt-6">
//                       Version
//                       <Textarea
//                         name="assessment_version"
//                         variant="bordered"
//                         placeholder="Enter version"
//                         disableAutosize
//                         classNames={{
//                           base: "w-full h-14 mt-2",
//                           input: "pt-2",
//                         }}
//                         onChange={handleChange}
//                         value={values.assessment_version}
//                       />
//                       <ErrorMessage
//                         name="assessment_version"
//                         component={"p"}
//                         className="text-red-500  text-sm"
//                       />
//                     </div>

//                     <div className="text-sm mb-2 ml-2 mt-6">
//                       Description
//                       <Textarea
//                         name="assessment_description"
//                         variant="bordered"
//                         placeholder="Enter Description"
//                         disableAutosize
//                         classNames={{
//                           base: "w-full h-14 mt-2",
//                           input: "pt-2",
//                         }}
//                         onChange={handleChange}
//                         value={values.assessment_description}
//                       />
//                       <ErrorMessage
//                         name="assessment_description"
//                         component={"p"}
//                         className="text-red-500  text-sm"
//                       />
//                     </div>

//                     <div className="text-sm mb-2 ml-2 mt-6">
//                       Accreditation Body
//                       <Textarea
//                         name="accreditation_body"
//                         variant="bordered"
//                         placeholder="Enter accreditation body"
//                         disableAutosize
//                         classNames={{
//                           base: "w-full h-14 mt-2",
//                           input: "pt-2",
//                         }}
//                         onChange={handleChange}
//                         value={values.accreditation_body}
//                       />
//                       <ErrorMessage
//                         name="email"
//                         component={"p"}
//                         className="text-red-500  text-sm"
//                       />
//                     </div>

//                     <div className="text-sm mb-2 ml-2 mt-6">
//                       Accreditation Table
//                       <Textarea
//                         name="assessment_db_table"
//                         variant="bordered"
//                         placeholder="Enter accreditation table"
//                         disableAutosize
//                         classNames={{
//                           base: "w-full h-14 mt-2",
//                           input: "pt-2",
//                         }}
//                         onChange={handleChange}
//                         value={values.assessment_db_table}
//                       />
//                       <ErrorMessage
//                         name="email"
//                         component={"p"}
//                         className="text-red-500  text-sm"
//                       />
//                     </div>

//                     <div className="text-sm mb-2 mt-6">
//                       Upload File
//                       <div className="mt-2.5">
//                         <div className="flex items-center justify-between  h-14 border-2  border-abb3bc rounded-md p-4 w-full">
//                           <div className="mr-2">
//                             <label htmlFor="file-upload">
//                               File : {/* @ts-ignore */}
//                               {uploadFile?.name}
//                             </label>
//                             <input
//                               id="file-upload"
//                               type="file"
//                               className="hidden"
//                               accept=".csv"
//                               onChange={handleFileChange}
//                             />
//                           </div>
//                           <div>
//                             <label
//                               htmlFor="file-upload"
//                               className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
//                             >
//                               Upload file
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       <ErrorMessage
//                         name="vat_number"
//                         component={"p"}
//                         className="text-red-500 text-sm"
//                       />
//                     </div>
//                     <div className="text-sm mb-2 ml-2 mt-6">
//                       Select Assessment Status
//                       <RadioGroup
//                         name="assessment_framework_status"
//                         value={values.assessment_framework_status}
//                         onChange={handleChange}
//                       >
//                         <Radio value="true">Active</Radio>
//                         <Radio value="false">Inactive</Radio>
//                       </RadioGroup>
//                       <ErrorMessage
//                         name="email"
//                         component={"p"}
//                         className="text-red-500  text-sm"
//                       />
//                     </div>
//                     {dynamicFields.length > 0
//                       ? dynamicFields.map((df) => {
//                         const dynamicFieldValue =
//                           dynamicFieldsData?.find(
//                             (field: any) => field.field === df
//                           )?.value || "";
//                         const dynsmicFieldvalueName =
//                           dynamicFieldAllTypes.find(
//                             (e) => e.id === dynamicFieldValue
//                           )?.name || "";
//                         return (
//                           <div className="mt-5" key={df}>
//                             <Input
//                               label={df}
//                               className="max-w-xl border-0 focus:border-none"
//                               style={{
//                                 border: "unset",
//                                 backgroundColor: "none",
//                               }}
//                               name={df}
//                               onChange={handleChange}
//                               value={
//                                 (dynsmicFieldvalueName &&
//                                   dynsmicFieldvalueName) ||
//                                 ""
//                               }
//                             />
//                           </div>
//                         );
//                       })
//                       : null}

//                     <div
//                       className="text-primary-500 mt-3 cursor-pointer"
//                       onClick={handleAddNewField}
//                     >
//                       + Add New Filed
//                     </div>
//                     {showNewFieldInput ? (
//                       <div className="mt-2">
//                         <div className=" flex justify-between my-2">
//                           <Input
//                             type="text"
//                             label="Enter new field name"
//                             className="border-0 focus:border-none mr-2"
//                             style={{ border: "unset", backgroundColor: "none" }}
//                             name="body"
//                             onChange={(e) =>
//                               setDynamicFieldName(e.target.value)
//                             }
//                             value={dynamicFieldName}
//                             required
//                           />
//                           <Select
//                             items={dynamicFieldAllTypes}
//                             label="Select type"
//                             className="max-w-xs"
//                             variant="bordered"
//                             name={dynamicFieldType}
//                             onChange={(e) => {
//                               handleChange(e);
//                               setDynamicFieldType(e.target.value);
//                             }}
//                             classNames={{
//                               label: "group-data-[filled=true]:-translate-y-5",
//                               trigger: "min-h-unit-16",
//                               listboxWrapper: "max-h-[400px]",
//                             }}
//                             listboxProps={{
//                               itemClasses: {
//                                 base: [
//                                   "rounded-md",
//                                   "text-default-500",
//                                   "transition-opacity",
//                                   "data-[hover=true]:text-foreground",
//                                   "data-[hover=true]:bg-default-100",
//                                   "dark:data-[hover=true]:bg-default-50",
//                                   "data-[selectable=true]:focus:bg-default-50",
//                                   "data-[pressed=true]:opacity-70",
//                                   "data-[focus-visible=true]:ring-default-500",
//                                 ],
//                               },
//                             }}
//                             popoverProps={{
//                               classNames: {
//                                 base: "before:bg-default-200",
//                                 content:
//                                   "p-0 border-small border-divider bg-background",
//                               },
//                             }}
//                             renderValue={(items: any) => {
//                               return items.map((item: any) => (
//                                 <div
//                                   key={item.id}
//                                   className="flex items-center gap-2"
//                                 >
//                                   <span className=" text-base">
//                                     {item.data.avatar}
//                                   </span>
//                                   <span className="text-default-500 text-base">
//                                     {item.data.name}
//                                   </span>
//                                 </div>
//                               ));
//                             }}
//                           >
//                             {(dynamicFieldAllTypes: any) => (
//                               <SelectItem
//                                 key={dynamicFieldAllTypes.id}
//                                 textValue={dynamicFieldAllTypes.name}
//                                 className="nunito-regular"
//                               >
//                                 <div className="flex gap-2 items-center">
//                                   <span className="text-sm">
//                                     {dynamicFieldAllTypes.avatar}
//                                   </span>
//                                   <span className="text-sm text-default-400">
//                                     {dynamicFieldAllTypes.name}
//                                   </span>
//                                 </div>
//                               </SelectItem>
//                             )}
//                           </Select>
//                         </div>
//                         <Button
//                           size="lg"
//                           color={dynamicFieldName ? "primary" : "default"}
//                           disabled={!dynamicFieldName}
//                           onClick={handleAddField}
//                         >
//                           Add
//                         </Button>
//                       </div>
//                     ) : null}
//                     <div className="flex flex-wrap  gap-4 items-center">
//                       <Button
//                         color="primary"
//                         className="my-5"
//                         size="lg"
//                         type="submit"
//                       >
//                         {updateData ? "Update Assessment" : "Add Framework"}
//                       </Button>
//                       <Button
//                         onClick={handleCancelUpdate}
//                         className="my-5"
//                         size="lg"
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </Form>
//                 </div>
//               )}
//             </Formik>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

// export default AddFramework;
