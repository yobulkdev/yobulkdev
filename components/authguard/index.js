import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Login from '../../components/login';
import { useRouter } from 'next/router';

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValidSession, setValidSession] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!router) return;
    if (
      [
        '/saasloader/[templateId]',
        '/saasloadmatcher',
        '/dataviewer/[viewtype]',
      ].includes(router.pathname)
    ) {
      setValidSession(true);
    }
    if (session) {
      setValidSession(true);
    }
    setLoading(false);
  }, [router, session]);

  return loading ? <></> : <>{isValidSession ? <>{children}</> : <Login />} </>;
};

export default AuthGuard;
