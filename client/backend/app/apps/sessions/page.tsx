'use client';

import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbsSlice';
import { useAppDispatch } from '@/hooks';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SessionsTable from '@/components/sessions-table/sessions-table';
import { SessionStatus } from '@/types/enum';

function SessionsPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBreadCrumbs([{ label: 'Sessions', link: '/apps/sessions' }]));
  }, [dispatch]);
  return (
    <div className='page'>
      <Tabs defaultValue='pending' className=''>
        <TabsList className='w-full'>
          <TabsTrigger value='pending'>Pending</TabsTrigger>
          <TabsTrigger value='in-progress'>In Progress</TabsTrigger>
          <TabsTrigger value='on-hold'>On Hold</TabsTrigger>
          <TabsTrigger value='completed'>Completed</TabsTrigger>
        </TabsList>
        <TabsContent value='pending'>
          <SessionsTable type={SessionStatus.Pending} />
        </TabsContent>
        <TabsContent value='in-progress'>
          <SessionsTable type={SessionStatus.InProgress} />
        </TabsContent>
        <TabsContent value='on-hold'>
          <SessionsTable type={SessionStatus.OnHold} />
        </TabsContent>
        <TabsContent value='completed'>
          <SessionsTable type={SessionStatus.Completed} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default SessionsPage;

