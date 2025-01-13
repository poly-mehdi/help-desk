import { cookies } from 'next/headers'

import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '../../components/app-sidebar'
import HeaderDashboard from '@/components/header-dashboard'
import { SocketProvider } from '@/components/socket-provider'

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <SocketProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className='w-full'>
          <HeaderDashboard />
          {children}
        </main>
      </SidebarProvider>
    </SocketProvider>
  )
}

export default Layout
