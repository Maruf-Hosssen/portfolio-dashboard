// components/withAuth.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface WithAuthProps {
  children: ReactNode;
}

const withAuth = (WrappedComponent: React.ComponentType<WithAuthProps>) => {
  const AuthenticatedComponent = (props: WithAuthProps) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
