'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { BreadCrumbSlice } from '@/features/breadcrumbs/breadcrumbsSlice';
import { ModeSwitcher } from './mode-switcher';
import { useAppSelector } from '@/hooks';
import { LayoutSlice } from '@/features/layout/layoutSlice';

function HeaderDashboard() {
  const breadcrumbs = useAppSelector(
    (state: { breadcrumbsState: BreadCrumbSlice }) =>
      state.breadcrumbsState.items
  );
  const visible = useAppSelector(
    (state: { layoutState: LayoutSlice }) => state.layoutState.visible
  );

  return (
    visible && (
      <header className='flex h-16 shrink-0 items-center gap-2 px-4 justify-between'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator
                className={`${breadcrumbs.length === 0 ? 'hidden' : 'block'}`}
              />
              {breadcrumbs.map((page, index) => {
                return (
                  <div key={index} className='flex items-center gap-2'>
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink href={page.link}>
                        {page.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='flex items-center gap-2'>
          <ModeSwitcher />
        </div>
      </header>
    )
  );
}
export default HeaderDashboard;
