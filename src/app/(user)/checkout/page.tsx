import AuthWrapper from "@/app/AuthWrapper";
import Account from "@/modules/Account/screens/Account";
import Checkout from "@/modules/CheckOut/screens/Checkout";
import Dashboard from "@/modules/Dashboard/screen/Dashboard";
import ReportList from "@/modules/Reports/screens/ReportList";
// import ReportList from "@/modules/Repots/screens/ReportList";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <Checkout />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
