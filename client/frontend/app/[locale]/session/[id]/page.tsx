'use client';

import { useRoomEvent } from '@/hooks/useRoomEvent';
import { useRoomUrl } from '@/hooks/useRoomUrl';
import '@whereby.com/browser-sdk/embed';
import { useTranslations } from 'next-intl';
import { WherebyProvider } from '@whereby.com/browser-sdk/react';
import { Loader2 } from 'lucide-react';

function RoomPage() {
  const t = useTranslations();
  const roomUrl = useRoomUrl();
  const wherebyRef = useRoomEvent(roomUrl);

  if (roomUrl) {
    return (
      <whereby-embed
        ref={wherebyRef}
        data-testid='whereby-embed'
        room={roomUrl}
        style={{ width: '100%', height: '100vh' }}
      />
    );
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl mb-10'>{t('room.waiting-message')}</h1>
        <Loader2 className='animate-spin' size={100} />
      </div>
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

