import AuthWrapper from "@/app/AuthWrapper";
import EditReport from "@/modules/Reports/form/EditReports";


const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <EditReport />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
