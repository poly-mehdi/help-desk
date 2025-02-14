import {
  LayoutDashboard,
  GalleryVerticalEnd,
  Settings2,
  ChartNoAxesCombined,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { NavUser } from './nav-user';
import Image from 'next/image';

const items = [
  {
    title: 'Dashboard',
    url: '/apps',
    icon: LayoutDashboard,
  },
  {
    title: 'Sessions',
    url: '/apps/sessions',
    icon: GalleryVerticalEnd,
  },
  {
    title: 'Statistics',
    url: '/apps/statistics',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Support Settings',
    url: '/apps/support-settings',
    icon: Settings2,
  },
];

export async function AppSidebar() {
  const session = await auth();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='/apps'>
                <div className='flex aspect-square size-32 items-center justify-center rounded-lg  text-sidebar-primary-foreground bg-transparent'>
                  <Image
                    src={'/images/logo.svg'}
                    alt='BenchKATALOG'
                    width={1000}
                    height={100}
                  />
                </div>
                {/* <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>Helpdesk</span>
                  <span className='truncate text-xs'>BenchKATALOG</span>
                </div> */}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{session && <NavUser session={session} />}</SidebarFooter>
    </Sidebar>
  );
}

