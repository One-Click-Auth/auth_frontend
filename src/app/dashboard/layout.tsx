
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { AuthContext } from '@/Providers/AuthContext';

const ServerProtectedPage = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }


  return <AuthContext session={session}>{children}</AuthContext>;
};

export default ServerProtectedPage;
 