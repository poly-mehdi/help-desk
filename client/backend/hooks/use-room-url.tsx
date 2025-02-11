import { useEffect, useState } from 'react';
import { socket } from '@/socket';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const useRoomUrl = () => {
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const { id: sessionId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (roomUrl) {
      return;
    }
    if (searchParams.get('recall') === 'true') {
      socket.on('session.recalled', (data: { hostRoomUrl: string }) => {
        setRoomUrl(data.hostRoomUrl);
      });
      socket.on('update.info.user', (data: { session: Session }) => {
        console.log('update.info.user', data.session);
        if (data.session.id === sessionId) {
          router.push(`/apps/session/expired`);
        }
      });
      socket.emit('sessionRecall', { sessionId: sessionId });
      return () => {
        socket.off('session.recalled');
        socket.off('update.info.user');
      };
    } else {
      socket.on('assistance.started', (data: { hostRoomUrl: string }) => {
        setRoomUrl(data.hostRoomUrl);
      });
      socket.emit('startAssistance', { sessionId: sessionId });
      return () => {
        socket.off('assistance.started');
        socket.off('update.info.user');
      };
    }
  }, [sessionId]);

  return roomUrl;
};

