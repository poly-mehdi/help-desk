'use client'

import { LoadingSpinner } from '@/components/loading'
import { useRoomEvent } from '@/hooks/useRoomEvent'
import { useRoomUrl } from '@/hooks/useRoomUrl'
import '@whereby.com/browser-sdk/embed'

function RoomPage() {
  const roomUrl = useRoomUrl()
  const wherebyRef = useRoomEvent(roomUrl)

  if (roomUrl) {
    return (
      <whereby-embed
        ref={wherebyRef}
        room={roomUrl}
        style={{ width: '100%', height: '100vh' }}
      />
    )
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl mb-10'>
          An advisor will be with you shortly. Thank you for your patience.
        </h1>
        <LoadingSpinner size={100} />
      </div>
    </div>
  )
}

export default RoomPage
