import AuthWrapper from "@/app/AuthWrapper";
import Dashboard from "@/modules/Dashboard/screen/Dashboard";
import ReportList from "@/modules/Reports/screens/ReportList";
// import ReportList from "@/modules/Repots/screens/ReportList";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <ReportList />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
