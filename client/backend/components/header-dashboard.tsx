'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { BreadCrumbSlice } from '@/features/breadcrumbs/breadcrumbsSlice'
import { ModeSwitcher } from './mode-switcher'
import { useAppSelector } from '@/hooks'

function HeaderDashboard() {
  const breadcrumbs = useAppSelector(
    (state: { breadcrumbsState: BreadCrumbSlice }) =>
      state.breadcrumbsState.items
  )

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
            <BreadcrumbSeparator
              className={`'hidden ${
                breadcrumbs.length === 0 ? 'md:hidden' : 'md:block'
              }`}
            />
            {breadcrumbs.map((page, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={page.link}>{page.label}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='flex items-center gap-2'>
        <ModeSwitcher />
      </div>
    </header>
  )
}
export default HeaderDashboard
