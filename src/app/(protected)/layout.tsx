import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "./dashboard/Navbar";
const ServerProtectedPage = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <AuthContext session={session}>
      <div className="flex flex-row">
        <div className="w-2/12">
          <Navbar />
        </div>
        {children}
      </div>
   </AuthContext>
  );
};

export default ServerProtectedPage;
