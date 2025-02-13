import { columns } from './columns';
import { DataTable } from './data-table';
import { SessionStatus } from '@/types/enum';
import { useAppSelector } from '@/hooks';
import { useMemo } from 'react';
import { useSessions } from '@/hooks/use-sessions';

const SessionsTable = ({ type }: { type: SessionStatus }) => {
  const allSessions = useAppSelector(
    (state: { sessionState: { sessions: Session[] } }) =>
      state.sessionState.sessions
  );
  const sessions = useMemo(
    () => allSessions.filter((session) => session.status === type),
    [allSessions]
  );
  useSessions();
  return <DataTable columns={columns} data={sessions} />;
};
export default SessionsTable;

