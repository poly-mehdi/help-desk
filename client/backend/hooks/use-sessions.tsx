import { socket } from '@/socket'
import { useEffect } from 'react'
import {
  addSession,
  addSessions,
  updateSession,
} from '@/features/session/sessionSlice'
import { useAppDispatch } from '@/hooks'
import { useRouter } from 'next/navigation'

export enum ParticipantRole {
  Customer = 'Customer',
  Assistant = 'Assistant',
}

let instances = 0

export const useSessions = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (instances === 0) {
      socket.on('session.created', (session: Session) => {
        dispatch(addSession(session))
      })
      socket.on('assistance.ended.by.user', (session: Session) => {
        dispatch(updateSession(session))
      })
      socket.on('update.info.user', (session: Session) => {
        dispatch(updateSession(session))
      })
      socket.on('session.rejected', (data: { session: Session }) => {
        dispatch(updateSession(data.session))
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
        socket.off('assistance.ended.by.user')
        socket.off('update.info.user')
        socket.off('session.rejected')
      }
      instances--
    }
  }, [])
}

