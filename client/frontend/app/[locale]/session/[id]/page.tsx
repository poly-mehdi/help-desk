'use client';

import { useRoomEvent } from '@/hooks/useRoomEvent';
import { useRoomUrl } from '@/hooks/useRoomUrl';
import '@whereby.com/browser-sdk/embed';
import { useTranslations } from 'next-intl';
import { WherebyProvider } from '@whereby.com/browser-sdk/react';
import { Loader2 } from 'lucide-react';

function RoomPage() {
  const t = useTranslations();
  const { roomUrl, name } = useRoomUrl();
  const wherebyRef = useRoomEvent(roomUrl);

  if (roomUrl) {
    return (
      <whereby-embed
        ref={wherebyRef}
        data-testid='whereby-embed'
        room={roomUrl}
        displayName={name || ''}
        style={{ width: '100%', height: '100vh' }}
      />
    );
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <div className='flex flex-col items-center'>
        <div className='bg-primary-foreground p-4 rounded-md mb-2'>
          <h1 className='text-2xl max-w-[800px]'>
            {t('room.waiting-message')}
          </h1>
        </div>
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

