import AuthWrapper from "@/app/AuthWrapper";
import About from "@/modules/About/screens/About";
import Contact from "@/modules/Contact/screens/Contact";


export default async function HomePage() {
  return (
    <>
      {/* <AuthWrapper> */}
      <Contact />
      {/* </AuthWrapper> */}
    </>
  );
}
