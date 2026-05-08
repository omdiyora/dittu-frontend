import AuthWrapper from "@/app/AuthWrapper";
import AddReport from "@/modules/Reports/form/AddProduct";


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
