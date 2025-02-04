'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { SocketProvider } from '@/components/socket-provider';
import { ReduxProvider } from '@/components/redux-provider';

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

