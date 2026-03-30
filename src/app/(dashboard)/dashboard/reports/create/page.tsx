import AuthWrapper from "@/app/AuthWrapper";
import AddReport from "@/modules/Reports/form/AddReports";


const AddReportPage = async () => {
  return (
    <>
      <AuthWrapper>
        <AddReport />
      </AuthWrapper>
    </>
  );
};
export default AddReportPage;
