import AuthWrapper from "@/app/AuthWrapper";
import Analytics from "@/modules/Analytics/screen/Analytics";
import Dashboard from "@/modules/Dashboard/screen/Dashboard";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <Analytics />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
