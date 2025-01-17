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

import { usePathname } from 'next/navigation'
import { formatBreadcrumb } from '@/utils/format-breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'
import { Save, Pencil } from 'lucide-react'
import { saveLayout, toggleEditable } from '@/features/layout/layoutSlice'
import { Widget } from '@/app/dashboard/page'

function HeaderDashboard() {
  const path = usePathname()

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
        <ModeSwitcher />
      </div>
    </header>
  )
}
export default HeaderDashboard
