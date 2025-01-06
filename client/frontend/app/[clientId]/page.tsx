'use client'

import { usePathname } from 'next/navigation'
import { useSocketContext } from '../providers/socket-provider'

function RoomPage() {
  const pathname = usePathname()
  const { isConnected, transport, sessionId } = useSocketContext()

  return (
    <div>
      <h1>Room Page</h1>
      <p>Pathname: {pathname}</p>
      <p>Session ID: {sessionId}</p>
      <p>Transport: {transport}</p>
      <p>Is Connected: {isConnected ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default RoomPage
