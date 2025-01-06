import React from 'react'
import { SocketContext } from './socket-provider'

export const MockSocketProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const mockSocketContext = {
    transport: null,
    clientId: 'mock-client-id',
    isConnected: true,
  }

  return (
    <SocketContext.Provider value={mockSocketContext}>
      {children}
    </SocketContext.Provider>
  )
}
