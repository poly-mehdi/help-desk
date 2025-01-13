import { cookies } from 'next/headers'

import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '../components/app-sidebar'
import HeaderDashboard from '@/components/ui/header-dashboard'

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main>
        <HeaderDashboard />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default Layout
