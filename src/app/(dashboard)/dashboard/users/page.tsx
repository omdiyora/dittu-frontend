import AuthWrapper from "@/app/AuthWrapper";

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
