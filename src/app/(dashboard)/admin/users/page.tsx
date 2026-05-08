import AuthWrapper from "@/app/AuthWrapper";
import AdminOrders from "@/modules/Orders/screens/Orders";
import UsersList from "@/modules/Users/screens/UsersList";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <UsersList />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
