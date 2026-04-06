import AuthWrapper from "@/app/AuthWrapper";
import AdminOrders from "@/modules/Orders/screens/Orders";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <AdminOrders />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
