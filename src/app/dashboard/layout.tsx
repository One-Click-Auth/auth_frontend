import React from "react"
import AccountNav from "./components/Nav";
import { Sidebar } from "./components/Sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import { AuthContext } from "./AuthContext";
interface AccountLayoutType {
  children: React.ReactNode;
}
async function AccountLayout({ children }: AccountLayoutType) {
  
  const session = await getServerSession(authOptions);
  console.log({ session });
  if (!session) {
    redirect("/login?callbackUrl=/protected/server");
  }

  return (
    <AuthContext {...session}>
    <div className="flex">
      <div className="min-h-screen bg-black">
        <Sidebar />
      </div>
      <div className="w-full px-2 sm:px-4 py-3 max-w-full overflow-x-auto">
        <AccountNav />
        <div className="mt-4 ">{children}</div>
      </div>
    </div>

      <div className="flex flex-row">
        <div className="w-2/12">
          <Navbar />
        </div>
        {children}
      </div>
    </AuthContext>
  );
};

export default AccountLayout;
