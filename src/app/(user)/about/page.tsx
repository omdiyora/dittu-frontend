import AuthWrapper from "@/app/AuthWrapper";
import Account from "@/modules/Account/screens/Account";


export default async function HomePage() {
  return (
    <>
      <AuthWrapper>
      <Account />
      </AuthWrapper>
    </>
  );
}
