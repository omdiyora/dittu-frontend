import AuthWrapper from "@/app/AuthWrapper";
import WishList from "@/modules/Account/screens/WishList";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <WishList />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
