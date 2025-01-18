import SessionsCard from '@/components/sessions-card/sessions-card'
import { useSessions } from '@/hooks/use-sessions'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

function PendingSessionsWidget() {
  const allSessions = useSelector(
    (state: { sessionState: { sessions: Session[] } }) =>
      state.sessionState.sessions
  )
  const sessions = useMemo(
    () => allSessions.filter((session) => session.status === 'Pending'),
    [allSessions]
  )
  const router = useRouter()
  useSessions()

  const actions = [
    {
      title: 'Accept',
      action: (session: Session) => {
        router.push(`/dashboard/session/${session.id}`)
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
    <div className='overflow-scroll h-full'>
      <SessionsCard
        title={'Pending Sessions'}
        sessions={sessions}
        actions={actions}
      />
    </div>
  )
}

export default PendingSessionsWidget
