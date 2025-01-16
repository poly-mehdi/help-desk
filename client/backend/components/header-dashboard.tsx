'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeSwitcher } from './mode-switcher'
import { EditSwitcher } from './edit-switcher'
import { SaveLayout } from './save-layout'
import { usePathname } from 'next/navigation'
import { formatBreadcrumb } from '@/utils/format-breadcrumb'

function HeaderDashboard() {
  const path = usePathname()

  // add a new breadcrumb item for the current page
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 px-4 justify-between'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>
              <BreadcrumbPage>{formatBreadcrumb(path)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='flex items-center gap-2'>
        <SaveLayout />
        <EditSwitcher />
        <ModeSwitcher />
      </div>
    </header>
  )
}
export default HeaderDashboard
