import { ThemeProvider } from './theme-provider';
import { SocketProvider } from './socket-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

async function Providers({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <SocketProvider>{children}</SocketProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}

export default Providers;

