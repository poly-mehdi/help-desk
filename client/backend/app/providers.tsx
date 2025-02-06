'use client';

import { ReduxProvider } from '@/components/redux-provider';
import { SocketProvider } from '@/components/socket-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <SocketProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </SocketProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default Providers;
