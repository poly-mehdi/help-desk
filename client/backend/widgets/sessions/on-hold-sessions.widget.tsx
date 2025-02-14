import SessionsCard from '@/components/sessions-card/sessions-card';
import { useMemo } from 'react';
import { useSessions } from '@/hooks/use-sessions';
import { useAppSelector } from '@/hooks';
import { socket } from '@/socket';
import { useRouter } from 'next/navigation';

function OnHoldSessionsWidget() {
  const router = useRouter();
  const allSessions = useAppSelector(
    (state: { sessionState: { sessions: Session[] } }) =>
      state.sessionState.sessions
  );
  const sessions = useMemo(
    () => allSessions.filter((session) => session.status === 'On Hold'),
    [allSessions]
  );
  useSessions();

  const actions = [
    {
      title: 'Contact',
    },
    {
      title: 'Reject',
      action: (session: Session) => {
        router.push(`/apps/sessions/reject/${session.id}`);
      },
    },
  ];

  return (
    <div className='overflow-scroll @container h-full'>
      <SessionsCard
        title={'On Hold Sessions'}
        sessions={sessions}
        actions={actions}
      />
    </div>
  );
}

export default OnHoldSessionsWidget;
