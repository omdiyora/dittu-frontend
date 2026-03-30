import AuthWrapper from "@/app/AuthWrapper";
import Dashboard from "@/modules/Dashboard/screen/Dashboard";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <Dashboard />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
