'use client';

import { LoadingSpinner } from '@/components/loading';
import { useRoomEvent } from '@/hooks/useRoomEvent';
import { useRoomUrl } from '@/hooks/useRoomUrl';
import '@whereby.com/browser-sdk/embed';
import { useTranslations } from 'next-intl';

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
        <LoadingSpinner size={100} data-testid='loading-spinner' />
      </div>
    </div>
  );
}

export default RoomPage;

