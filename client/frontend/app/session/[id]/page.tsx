'use client'

import { usePathname } from 'next/navigation'
import { useSocketContext } from '@/app/providers/socket-provider'
import { LoadingSpinner } from '@/components/loading'

function RoomPage() {
  const pathname = usePathname()
  const { isConnected, transport, clientId } = useSocketContext()

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <h1 className='text-2xl mb-10'>
        An advisor will be with you shortly. Thank you for your patience.
      </h1>
      <LoadingSpinner size={100} />
    </div>
  )
}

export default RoomPage
