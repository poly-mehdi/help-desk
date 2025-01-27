import SessionsCard from '@/components/sessions-card/sessions-card'
import { rejectSession } from '@/features/session/sessionSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useSessions } from '@/hooks/use-sessions'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

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
  const dispatch = useAppDispatch()
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
        dispatch(rejectSession(session.id))
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
