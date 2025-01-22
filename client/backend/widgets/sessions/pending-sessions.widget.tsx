import SessionsCard from '@/components/sessions-card/sessions-card'
import { useAppSelector } from '@/hooks'
import { useSessions } from '@/hooks/use-sessions'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export type Action = {
  title: string
  action: (session: Session) => void
}

function PendingSessionsWidget() {
  const allSessions = useAppSelector(
    (state: { sessionState: { sessions: Session[] } }) =>
      state.sessionState.sessions
  )
  const sessions = useMemo(
    () => allSessions.filter((session) => session.status === 'Pending'),
    [allSessions]
  )
  const router = useRouter()
  useSessions()

  const actions: Action[] = [
    {
      title: 'Accept',
      action: (session: Session) => {
        router.push(`/apps/session/${session.id}`)
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
