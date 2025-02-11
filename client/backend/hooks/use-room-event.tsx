import { setVisibility } from '@/features/layout/layoutSlice';
import { useAppDispatch } from '@/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export type WherebyRef = HTMLDivElement & {
  endMeeting: () => void;
};

export const useRoomEvent = (roomUrl: string | null) => {
  const whereByRef = useRef(null);
  const router = useRouter();
  const { id: sessionId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const elm = whereByRef.current as WherebyRef | null;

    if (elm) {
      const handleEvent = (event: any) => {
        if (event.type === 'meeting_end') {
          router.push(`/apps/sessions/session-evaluation/${sessionId}`);
          dispatch(setVisibility(true));
        }
        if (event.type === 'leave') {
          elm.endMeeting();
          router.push(`/apps/sessions/session-evaluation/${sessionId}`);
          dispatch(setVisibility(true));
        }
      };

      const events = ['leave', 'meeting_end'];
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
