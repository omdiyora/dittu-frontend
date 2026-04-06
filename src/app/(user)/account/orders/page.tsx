import AuthWrapper from "@/app/AuthWrapper";
import Account from "@/modules/Account/screens/Account";
import Order from "@/modules/Account/screens/Order";
import Dashboard from "@/modules/Dashboard/screen/Dashboard";
import ReportList from "@/modules/Reports/screens/ReportList";
// import ReportList from "@/modules/Repots/screens/ReportList";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <Order />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
