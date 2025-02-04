import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useRoomEvent = (roomUrl: string | null) => {
  const whereByRef = useRef(null);
  const router = useRouter();
  const { id: sessionId } = useParams();

  useEffect(() => {
    const elm = whereByRef.current as HTMLDivElement | null;

    if (elm) {
      const handleEvent = (event: any) => {
        if (event.type === 'meeting_end') {
          router.push(`/apps/session/session-evaluation/${sessionId}`);
        }
      };

      const events = ['meeting_end'];
      events.forEach((event) => {
        elm.addEventListener(event, handleEvent);
      });
      return () => {
        events.forEach((event) => {
          elm.removeEventListener(event, handleEvent);
        });
      };
    }
  }, [roomUrl]);
  return whereByRef;
};
