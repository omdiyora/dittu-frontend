// import Login from "@/modules/Auth/screens/Login";
import { authOptions } from "@/lib/NextAuth/options";
import LoginPages from "@/modules/Auth/screens/LoginPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const LoginPage = async () => {
    const session = await getServerSession(authOptions);
   if(session?.user){
      return redirect("/")
  }
  return <LoginPages />;
};
export default LoginPage;
