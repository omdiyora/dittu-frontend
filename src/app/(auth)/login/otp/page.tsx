import { authOptions } from "@/lib/NextAuth/options";
// import OtpForm from "@/modules/Auth/screens/Otp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const OtpPage =async () => { 
  const session = await getServerSession(authOptions);
  if(session?.user){
     return redirect("/")
 }
  return <>OPT Page</>;
};
export default OtpPage;
