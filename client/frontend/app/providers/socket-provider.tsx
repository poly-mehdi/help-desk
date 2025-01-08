import React, { createContext, useContext, useEffect, useState } from 'react'
import { socket } from '@/socket'

interface SocketContextType {
  isConnected: boolean | undefined
  transport: string | null
  clientId: string | null
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')
  const [clientId, setClientId] = useState<string | null>(null)

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)
      setClientId(socket.id!)
    }

    const onDisconnect = () => {
      setIsConnected(false)
      setTransport('N/A')
      setClientId(null)
    }

    const onError = (error: Error) => {
      console.error('Connection error:', error)
    }

    if (socket.connected) {
      onConnect()
    } else {
      const sessionId = localStorage.getItem('sessionId')
      if (sessionId) {
        socket.auth = { sessionId }
        socket.connect()
      } else socket.connect()
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', onError)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('connect_error', onError)
    }
  }, [clientId])

  return (
    <SocketContext.Provider value={{ isConnected, transport, clientId }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  return useContext(SocketContext) as SocketContextType
}
