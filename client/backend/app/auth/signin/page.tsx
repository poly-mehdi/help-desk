'use client';

import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function SignIn() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn('keycloak');
    } else if (status === 'authenticated') {
      void router.push('/apps');
    }
  }, [status, router]);
  return <></>;
}

export default function SignInWrapper() {
  return (
    <SessionProvider>
      <SignIn />
    </SessionProvider>
  );
}
