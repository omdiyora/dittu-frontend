// import { answerTypes } from "@/constants/answerTypes";
// import { auditRolesConstants, rolesConstants } from "@/constants/roles";
// import { Select, SelectItem, Textarea } from "@nextui-org/react";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import { Tooltip } from "@heroui/react";
// import { IoCloseOutline, IoCloudUploadOutline, IoDownloadOutline, IoCloudDownloadOutline } from "react-icons/io5";
// const items = [
//   {
//     key: "Yes",
//     label: "Yes",
//   },
//   {
//     key: "No",
//     label: "No",
//   },
// ];

// const DynamicAnswers = ({
//   answerType,
//   setAnswer,
//   answer,
//   setSelectedValues,
//   selectedValues,
//   multiOptions,
//   assessmentStatus,
//   uploadDocument,
//   uploadName,
//   setUploadName,
//   answerError,
//   setAnswerApplicantNote,
//   answerApplicantNote,
//   activeQuestionDetail,
//   setUploadFiles,
//   uploadFiles,
//   currentUserAssessmentStatus
// }: {
//   answerType: string;
//   setAnswer: any;
//   answer: any;
//   selectedValues?: any;
//   setSelectedValues?: any;
//   multiOptions?: any;
//   assessmentStatus?: any;
//   uploadDocument?: any;
//   uploadName?: any;
//   setUploadName?: any;
//   answerError?: any;
//   setAnswerApplicantNote?: any;
//   answerApplicantNote?: any;
//   activeQuestionDetail?: any;
//   setUploadFiles?: any;
//   uploadFiles?: any;
//   currentUserAssessmentStatus?: any;
// }) => {
//   const [answerOther, setAnswerOther] = useState<any>("");

//   const itemsOptions = multiOptions?.map((option: any) => ({
//     key: option,
//     label: option,
//   }));


//   const handleFileChange = async (e: any) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const formData = new FormData();
//       formData.append("file", file);
//       setUploadName(file.name);
//       setUploadFiles(file)
//     }
//   };

//   const downloadFile = () => {
//     const anchor = document.createElement("a");

//     anchor.href = uploadFiles;

//     anchor.download = uploadFiles;
//     anchor.click();
//   };

//   const applicantNoteChangeHandler = (value: any) => {
//     setAnswerApplicantNote(value);
//   };

//   const selectedValueChangeHandler = (value: any) => {
//     setAnswer(value);
//   };

//   const selectedMultiChangeHandler = (value: any) => {
//     setAnswerOther(value);
//   };

//   const handleCheckboxChange = (selected: any) => {
//     setSelectedValues(selected.target.value);
//   };
//   const { data: session } = useSession();

//   switch (answerType) {
//     case answerTypes.YES_NO:
//       return (
//         <>
//           <Select
//             variant="bordered"
//             size={"md"}
//             label=" Select Answer"
//             className="w-full"
//             onChange={(e) => selectedValueChangeHandler(e.target.value)}
//             selectedKeys={[answer]}
//             isDisabled={
//               assessmentStatus === "Submitted" ||
//               assessmentStatus === "Pass" ||
//               assessmentStatus === "Fail" ||
//               assessmentStatus === "Under Review" ||
//               session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//               (session?.user.audit_role_id === auditRolesConstants.MANAGER && true)
//             }
//           >
//             {items?.map((value: any) => (
//               <SelectItem
//                 key={value.key}
//                 value={value.key}
//                 className="nunito-regular"
//               >
//                 {value.label}
//               </SelectItem>
//             ))}
//           </Select>
//           <div className="text-sm mb-2 ml-2 nunito-bold mt-3">
//             Applicant Notes
//           </div>
//           <Textarea
//             name="applicant_notes"
//             variant="bordered"
//             placeholder="Enter Applicant Notes"
//             value={answerApplicantNote}
//             onChange={(e) => applicantNoteChangeHandler(e.target.value)}
//             size="md"
//             classNames={{
//               base: "w-full mt-2",
//               input: "pt-2",
//             }}
//             isDisabled={
//               assessmentStatus === "Submitted" ||
//               assessmentStatus === "Pass" ||
//               assessmentStatus === "Fail" ||
//               assessmentStatus === "Under Review" ||
//               session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//               (session?.user.audit_role_id === auditRolesConstants.MANAGER && true)
//             }
//           />
//           <div className="ml-1.5 mt-2	" style={{ color: "red" }}>
//             {answerError}
//           </div>
//         </>
//       );
//     case answerTypes.MULTIPLE_CHOICE:
//       return (
//         <>
//           <Select
//             variant="bordered"
//             size="md"
//             label="Select Answer"
//             className="w-full"
//             onChange={(e) =>
//               selectedValueChangeHandler(
//                 activeQuestionDetail === "A1.9"
//                   // @ts-ignore
//                   ? [...e.target.value]
//                   : e.target.value
//               )
//             }
//             {...(activeQuestionDetail === "A1.9"
//               ? { defaultSelectedKeys: [answer] }
//               : { selectedKeys: [answer] })}
//             selectionMode={
//               activeQuestionDetail === "A1.9" ? "multiple" : "single"
//             }
//             isDisabled={
//               assessmentStatus === "Submitted" ||
//               assessmentStatus === "Pass" ||
//               assessmentStatus === "Fail" ||
//               assessmentStatus === "Under Review" ||
//               session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//               session?.user.audit_role_id === auditRolesConstants.MANAGER
//             }
//           >
//             {itemsOptions?.map((value: any) => (
//               <SelectItem
//                 key={value.key}
//                 value={value.key}
//                 className="nunito-regular"
//               >
//                 {value.label}
//               </SelectItem>
//             ))}
//           </Select >

//           {answer === "“OTH” – Other Organisation" && (
//             <Textarea
//               variant="bordered"
//               placeholder="You can write your note here..."
//               disableAnimation
//               disableAutosize
//               classNames={{
//                 base: "w-full mt-5",
//                 input: "resize-y min-h-[40px] p-2.5",
//               }}
//               value={answerOther}
//               onChange={(e) => selectedMultiChangeHandler(e.target.value)}
//               isDisabled={
//                 assessmentStatus === "Submitted" ||
//                 assessmentStatus === "Pass" ||
//                 assessmentStatus === "Fail" ||
//                 assessmentStatus === "Under Review" ||
//                 session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//                 (session?.user.audit_role_id === auditRolesConstants.MANAGER && true)
//               }
//             />
//           )
//           }
//           {
//             answer === "Other (please describe)" && (
//               <Textarea
//                 variant="bordered"
//                 placeholder="You can write your note here..."
//                 disableAnimation
//                 disableAutosize
//                 classNames={{
//                   base: "w-full mt-5",
//                   input: "resize-y min-h-[40px] p-2.5",
//                 }}
//                 value={answerOther}
//                 onChange={(e) => selectedMultiChangeHandler(e.target.value)}
//                 isDisabled={
//                   assessmentStatus === "Submitted" ||
//                   assessmentStatus === "Pass" ||
//                   assessmentStatus === "Fail" ||
//                   assessmentStatus === "Under Review" ||
//                   session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//                   (session?.user.audit_role_id === auditRolesConstants.MANAGER && true)
//                 }
//               />
//             )
//           }
//           <div className="text-sm mb-2 ml-2 nunito-bold mt-3">
//             Applicant Notes
//           </div>
//           <Textarea
//             name="applicant_notes"
//             variant="bordered"
//             placeholder="Enter Applicant Notes"
//             value={answerApplicantNote}
//             onChange={(e) => applicantNoteChangeHandler(e.target.value)}
//             size="md"
//             classNames={{
//               base: "w-full mt-2",
//               input: "pt-2",
//             }}
//             isDisabled={
//               assessmentStatus === "Submitted" ||
//               assessmentStatus === "Pass" ||
//               assessmentStatus === "Fail" ||
//               assessmentStatus === "Under Review" ||
//               session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//               (session?.user.audit_role_id === auditRolesConstants.MANAGER && true)
//             }
//           />
//           <div className="ml-1.5 mt-2	" style={{ color: "red" }}>
//             {answerError}
//           </div>
//         </>
//       );
//     case answerTypes.TEXT_FILE:
//       return (
//         <>
//           <>
//             <Textarea
//               variant="bordered"
//               placeholder="You can write your note here..."
//               disableAnimation
//               disableAutosize
//               classNames={{
//                 base: "w-full",
//                 input: "resize-y min-h-[40px] p-2.5",
//               }}
//               value={answer}
//               onChange={(e) => selectedValueChangeHandler(e.target.value)}
//               isDisabled={
//                 assessmentStatus === "Submitted" ||
//                 assessmentStatus === "Pass" ||
//                 assessmentStatus === "Fail" ||
//                 assessmentStatus === "Under Review" ||
//                 session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//                 (session?.user.audit_role_id === auditRolesConstants.MANAGER && true)
//               }
//             />
//             <div className="ml-1.5 mt-2	" style={{ color: "red" }}>
//               {answerError}
//             </div>

//             {/* <div className="mt-2.5">
//               <div className="flex items-center justify-between w-80 h-14 border-2  border-abb3bc rounded-md p-4">
//                 <div className="mr-2">
//                   <label htmlFor="file-upload">
//                     {session?.user.audit_role_id === auditRolesConstants.END_USER
//                       ? "Please select file : "
//                       : "Review file : "}{" "}
//                   </label>
//                   <input
//                     id="file-upload"
//                     type="file"
//                     className="hidden"
//                     onChange={handleFileChange}
//                     disabled={
//                       assessmentStatus === "Submitted" ||
//                       assessmentStatus === "Pass" ||
//                       assessmentStatus === "Fail" ||
//                       assessmentStatus === "Under Review" ||
//                       session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//                       (session?.user.audit_role_id === auditRolesConstants.MANAGER &&
//                         true)
//                     }
//                   />
//                 </div>

//                 <div>
//                   {session?.user.audit_role_id === auditRolesConstants.END_USER || currentUserAssessmentStatus?.assessorId !== session?.user?.id ? (
//                     <label
//                       htmlFor="file-upload"
//                       className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
//                     >
//                       Upload file
//                     </label>
//                   ) : (
//                     <label
//                       className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
//                       onClick={downloadFile}
//                     >
//                       Download File
//                     </label>
//                   )}
//                 </div>
//               </div>
//             </div> */}
//             {/* {uploadName && ( */}
//             <div className="mt-2.5 flex">
//               <div className="text-sm mb-2 ml-2 p-2">
//                 {!uploadName && session?.user.audit_role_id === auditRolesConstants.END_USER && `Please select file`} {uploadName && `File name`} :  {uploadName}
//               </div>
//               {
//                 session?.user.audit_role_id !== auditRolesConstants.END_USER && uploadName && (
//                   <Tooltip
//                     content={
//                       <div className="flex items-center gap-2">
//                         Download File
//                       </div>
//                     }
//                   >
//                     <span className="text-lg cursor-pointer active:opacity-50">
//                       <button
//                         type="button"
//                         // onClick={() => document.getElementById(`file-input-${uploadName}`)?.click()}
//                         // disabled={params?.mode === "view"}
//                         className="mb-3 ml-2 px-2 pt-1.5 relative"
//                         onClick={downloadFile}
//                       >
//                         <IoCloudDownloadOutline size={20} color={uploadName ? "green" : undefined} />
//                         {/* <IoCloudUploadOutline size={20} color={uploadName ? "green" : undefined} /> */}
//                       </button>
//                       <input
//                         id={`file-input-${uploadName}`}
//                         type="file"
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                     </span>
//                   </Tooltip>
//                 )
//               }
//               {
//                 session?.user.audit_role_id === auditRolesConstants.END_USER && (
//                   <Tooltip
//                     content={
//                       <div className="flex items-center gap-2">
//                         Upload File
//                       </div>
//                     }
//                   >
//                     <span className="text-lg cursor-pointer active:opacity-50">
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById(`file-input-${uploadName}`)?.click()}
//                         // disabled={params?.mode === "view"}
//                         className="mb-4 ml-2 px-2 pt-1.5 relative"
//                       >
//                         <IoCloudUploadOutline size={20} color={uploadName ? "green" : undefined} />
//                       </button>
//                       <input
//                         id={`file-input-${uploadName}`}
//                         type="file"
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                     </span>
//                   </Tooltip>
//                 )
//               }
//               {
//                 session?.user.audit_role_id === auditRolesConstants.END_USER && (
//                   <Tooltip content="Delete File">
//                     <span className="text-lg text-black cursor-pointer active:opacity-50">
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setUploadName(""); // Clear file name
//                           setUploadFiles(""); // Optional: clear file if you're storing the file object
//                         }}
//                         className="mb-4 px-2 pt-1 text-red-500 hover:text-red-700 text-sm underline"
//                         disabled={
//                           assessmentStatus === "Submitted" ||
//                           assessmentStatus === "Pass" ||
//                           assessmentStatus === "Fail" ||
//                           assessmentStatus === "Under Review" ||
//                           session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//                           (session?.user.audit_role_id === auditRolesConstants.MANAGER &&
//                             true)
//                         }
//                       >
//                         <IoCloseOutline size={24} />
//                       </button>
//                     </span>
//                   </Tooltip>
//                 )
//               }


//             </div>
//             {/* )} */}
//           </>

//         </>
//       );
//     case answerTypes.TEXT:
//     default:
//       return (
//         <>
//           <Textarea
//             variant="bordered"
//             placeholder="You can write your answer here..."
//             disableAnimation
//             disableAutosize
//             classNames={{
//               base: "w-full",
//               input: "resize-y min-h-[40px] p-2.5",
//             }}
//             value={answer}
//             onChange={(e) => selectedValueChangeHandler(e.target.value)}
//             isDisabled={
//               assessmentStatus === "Submitted" ||
//               assessmentStatus === "Pass" ||
//               assessmentStatus === "Fail" ||
//               assessmentStatus === "Under Review" ||
//               session?.user.audit_role_id === auditRolesConstants.ANALYST ||
//               (session?.user.audit_role_id === auditRolesConstants.MANAGER && true)
//             }
//           />
//           <div className="ml-1.5 mt-2	" style={{ color: "red" }}>
//             {answerError}
//           </div>
//         </>
//       );
//   }
// };
// export default DynamicAnswers;
