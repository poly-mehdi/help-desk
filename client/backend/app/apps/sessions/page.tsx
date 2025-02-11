'use client';

import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbsSlice';
import { useAppDispatch } from '@/hooks';
import { useEffect } from 'react';

function SessionsPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBreadCrumbs([{ label: 'Sessions', link: '/apps/sessions' }]));
  }, [dispatch]);
  return <div className='page'>Sessions - Coming Soon</div>;
}
export default SessionsPage;

