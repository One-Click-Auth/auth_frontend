import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { Sidebar } from './(pages)/components/Sidebar';
import AccountNav from './(pages)/components/Nav';
const ServerProtectedPage = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }

  return (
    <AuthContext session={session}>
      <div className="flex">
        <div className="min-h-screen bg-black">
          <Sidebar />
        </div>
        <div className="w-full px-2 sm:px-4 py-3 max-w-full overflow-x-auto">
          <AccountNav />
          <div className="flex">{children}</div>
        </div>
      </div>
      {children}
    </AuthContext>
  );
};

export default ServerProtectedPage;
