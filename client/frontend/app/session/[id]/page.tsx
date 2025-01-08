'use client'

import { LoadingSpinner } from '@/components/loading'
import { useRoomUrl } from '@/hooks/useRoomUrl'

function RoomPage() {
  const roomUrl = useRoomUrl()

  if (roomUrl) {
    return (
      <iframe
        className='w-full min-h-screen'
        src={roomUrl}
        allow='camera; microphone; fullscreen'
      ></iframe>
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
