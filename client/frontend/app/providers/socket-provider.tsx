import React, { createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { socket } from '../../socket'

interface SocketContextType {
  isConnected: boolean
  transport: string
  sessionId: string | null
}

const SocketContext = createContext<SocketContextType | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
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

    const onError = (error: Error) => {
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
  }, [setCookie])

  return (
    <SocketContext.Provider value={{ isConnected, transport, sessionId }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  return useContext(SocketContext) as SocketContextType
}
