import SessionsCard from '@/components/sessions-card/sessions-card'
import { useMemo } from 'react'
import { useSessions } from '@/hooks/use-sessions'
import { useAppSelector } from '@/hooks'

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
      action: (session: Session) => {
        console.log('Viewing session', session)
      },
    },
    {
      title: 'Reject',
      action: (session: Session) => {
        console.log('Editing session', session)
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
