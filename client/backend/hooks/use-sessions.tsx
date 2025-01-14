import { socket } from '@/socket'
import { useEffect, useMemo, useState } from 'react'

export enum ParticipantRole {
  Customer = 'Customer',
  Assistant = 'Assistant',
}

export enum SessionStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  OnHold = 'On Hold',
}

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  console.log(sessions)
  const pendingSessions = useMemo(() => {
    return sessions.filter(
      (session: Session) => session.status === SessionStatus.Pending
    )
  }, [sessions])
  const onHoldSessions = useMemo(() => {
    return sessions.filter(
      (session: Session) => session.status === SessionStatus.OnHold
    )
  }, [sessions])

  useEffect(() => {
    socket.on('session.created', (session: Session) => {
      setSessions((sessions) => [...sessions, session])
    })
    socket.once('getSessions', (data: unknown) => {
      const { sessions } = data as { sessions: unknown }
      setSessions(sessions as Session[])
    })
    socket.emit('getSessions')

    return () => {
      socket.off('session.created')
      socket.off('getSessions')
    }
  }, [])
  return { pendingSessions, onHoldSessions }
}
