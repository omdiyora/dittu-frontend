import AuthWrapper from "@/app/AuthWrapper";
import ReviewsList from "@/modules/Reviews/screens/ReviewsList";

const DashboardPage = async () => {
  return (
    <>
      <AuthWrapper>
        <ReviewsList />
      </AuthWrapper>
    </>
  );
};
export default DashboardPage;
