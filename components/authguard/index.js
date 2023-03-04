import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

const AuthGuard = ({ children }) => {
  const router = useRouter();

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div></div>;

  if (error) return <div>{error.message}</div>;

  if (!user) {
    router.push('/api/auth/login');
  }
  return <>{children}</>;
};

export default AuthGuard;
