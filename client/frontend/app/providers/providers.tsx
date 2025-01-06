'use client'

import { ThemeProvider } from './theme-provider'
import { SocketProvider } from './socket-provider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem
        disableTransitionOnChange
      >
        <SocketProvider>{children}</SocketProvider>
      </ThemeProvider>
    </>
  )
}

export default Providers
