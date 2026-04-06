import AuthWrapper from "@/app/AuthWrapper";
import Account from "@/modules/Account/screens/Account";
import Order from "@/modules/Account/screens/Order";
import UserAccount from "@/modules/Account/screens/UserAccount";
import UserAddress from "@/modules/Account/screens/UserAddress";
import Dashboard from "@/modules/Dashboard/screen/Dashboard";
import ReportList from "@/modules/Reports/screens/ReportList";
// import ReportList from "@/modules/Repots/screens/ReportList";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <UserAddress />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
