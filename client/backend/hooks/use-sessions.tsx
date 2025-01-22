import { socket } from '@/socket'
import { useEffect } from 'react'
import { addSession, addSessions } from '@/features/session/sessionSlice'
import { useAppDispatch } from '@/hooks'

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

let instances = 0

export const useSessions = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (instances === 0) {
      socket.on('session.created', (session: Session) => {
        dispatch(addSession(session))
      })
      socket.once('getSessions', (data: { sessions: Session[] }) => {
        const { sessions } = data
        dispatch(addSessions(sessions))
      })
      socket.emit('getSessions')
    }
    instances++

    return () => {
      if (instances === 1) {
        socket.off('session.created')
        socket.off('getSessions')
      }
      instances--
    }
  }, [])
}
