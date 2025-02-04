import SessionsCard from '@/components/sessions-card/sessions-card'
import { useMemo } from 'react'
import { useSessions } from '@/hooks/use-sessions'
import { useAppSelector } from '@/hooks'
import { socket } from '@/socket'

function OnHoldSessionsWidget() {
  const allSessions = useAppSelector(
    (state: { sessionState: { sessions: Session[] } }) =>
      state.sessionState.sessions
  )
  const sessions = useMemo(
    () => allSessions.filter((session) => session.status === 'On Hold'),
    [allSessions]
  )
  useSessions()

  const actions = [
    {
      title: 'Contact',
    },
    {
      title: 'Reject',
      action: (session: Session) => {
        socket.emit('rejectSession', { sessionId: session.id })
      },
    },
  ]

  return (
    <div className='overflow-scroll @container h-full'>
      <SessionsCard
        title={'On Hold Sessions'}
        sessions={sessions}
        actions={actions}
      />
    </div>
  )
}

export default OnHoldSessionsWidget
