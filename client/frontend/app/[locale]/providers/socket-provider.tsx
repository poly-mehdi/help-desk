'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { socket } from '@/socket'

interface SocketContextType {
  clientId: string | null
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setIsConnected] = useState(false)
  const [, setTransport] = useState('N/A')
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
    <SocketContext.Provider value={{ clientId }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  return useContext(SocketContext) as SocketContextType
}
