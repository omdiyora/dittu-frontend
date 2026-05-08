import AuthWrapper from "@/app/AuthWrapper";
import Dashboard from "@/modules/Dashboard/screen/Dashboard";
import ProductList from "@/modules/Reports/screens/ReportList";
import ProductTable from "@/modules/Reports/screens/ReportList";
import ReportList from "@/modules/Reports/screens/ReportList";
// import ReportList from "@/modules/Repots/screens/ReportList";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <ProductList />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
