import { authOptions } from "@/lib/NextAuth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  children?: React.ReactNode;
};

export default async function AuthWrapper({ children }: Props) {
  const session = await getServerSession(authOptions);
 
  if (!session?.user) {
    return redirect("/login");
  }
  
  
  return (<div>{children}</div>);
}
