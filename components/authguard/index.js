import React from 'react';
import { useSession } from 'next-auth/react';
import Login from '../../components/login';

const AuthGuard = ({children}) => {
  const { data: session } = useSession();
  return session ? (<>{children}</>) : (<Login />);
};

export default AuthGuard;
