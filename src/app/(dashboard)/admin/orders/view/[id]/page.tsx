import AuthWrapper from "@/app/AuthWrapper";
import OrderViewPage from "@/modules/Orders/form/ViewOrder";
import EditReport from "@/modules/Reports/form/EditProduct";


const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <OrderViewPage />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
