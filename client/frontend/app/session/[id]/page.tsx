'use client'

import { usePathname } from 'next/navigation'
import { useSocketContext } from '@/app/providers/socket-provider'
import { LoadingSpinner } from '@/components/loading'

function RoomPage() {
  const pathname = usePathname()
  const { isConnected, transport, clientId } = useSocketContext()

  return (
    <div>
      <h1>Room Page</h1>
      <p>Pathname: {pathname}</p>
      <p>Transport: {transport}</p>
      <p>Client ID: {clientId}</p>
      <p>Is Connected: {isConnected ? 'Yes' : 'No'}</p>
      <LoadingSpinner size={100} />
    </div>
  )
}

export default RoomPage
