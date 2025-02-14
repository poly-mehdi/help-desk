'use client';

import { ReduxProvider } from '@/components/redux-provider';
import { SocketProvider } from '@/components/socket-provider';
import { ThemeProvider } from '@/components/theme-provider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}

export default Providers;
