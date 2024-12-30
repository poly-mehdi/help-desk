import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { useCookies } from 'react-cookie'

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [, setCookie] = useCookies(['connect.sid'])

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)
    }

    const onDisconnect = () => {
      setIsConnected(false)
      setTransport('N/A')
    }

    const onSession = (sessionId: string) => {
      setSessionId(sessionId)
      setCookie('connect.sid', sessionId, { path: '/' })
    }

    const onError = (error: any) => {
      console.error('Connection error:', error)
    }

    if (socket.connected) {
      onConnect()
    } else {
      socket.connect()
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', onError)
    socket.on('session', onSession)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('connect_error', onError)
    }
  }, [])

  return { isConnected, transport, sessionId }
}
