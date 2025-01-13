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

function HeaderDashboard() {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className='hidden md:block'>
            <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='hidden md:block' />
          <BreadcrumbItem>
            <BreadcrumbPage>Sessions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
export default HeaderDashboard