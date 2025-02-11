'use client';

import { useRoomEvent } from '@/hooks/use-room-event';
import { useRoomUrl } from '@/hooks/use-room-url';
import { Loader2 } from 'lucide-react';

import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { useParams } from 'next/navigation';

import '@whereby.com/browser-sdk/embed';
import { WherebyProvider } from '@whereby.com/browser-sdk/react';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks';
import { setVisibility } from '@/features/layout/layoutSlice';
import { useSidebar } from '@/components/ui/sidebar';

function RoomPage() {
  const { id: sessionId } = useParams();
  const roomUrl = useRoomUrl();
  const wherebyRef = useRoomEvent(roomUrl);
  const dispatch = useAppDispatch();
  useBreadcrumbs([
    { label: 'Session', link: '/apps/sessions' },
    { label: 'Assistance', link: `/apps/sessions/${sessionId}` },
  ]);
  const { open, toggleSidebar } = useSidebar();

  useEffect(() => {
    dispatch(setVisibility(false));
    if (open) toggleSidebar();
  }, []);

  if (roomUrl) {
    return (
      <whereby-embed
        ref={wherebyRef}
        room={roomUrl}
        style={{ width: '100%', height: '100vh' }}
      />
    );
  }
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
      <Loader2 className='animate-spin' size={100} />
    </div>
  );
}
export default function RoomPageWrapper() {
  return (
    <WherebyProvider>
      <RoomPage />
    </WherebyProvider>
  );
}

