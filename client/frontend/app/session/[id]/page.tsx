'use client'

// import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { LoadingSpinner } from '@/components/loading'
import '@whereby.com/browser-sdk/embed'

function RoomPage() {
  // const router = useRouter()
  const [roomUrl, setRoomUrl] = useState<string | null>()

  useEffect(() => {
    // const timeout = setTimeout(() => router.push('/session/contact'), 1000)
    const timeout = setTimeout(
      () => console.log('Timeout! Redirecting to /session/contact'),
      30000
    )

    socket.once('advisor.connected', (assistance: string) => {
      console.log(
        'advisor.connected event received, clearing timeout',
        assistance
      )
      setRoomUrl(assistance)
      clearTimeout(timeout)
    })

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (roomUrl) {
    // return <whereby-embed room={roomUrl} />
    return <iframe className='w-full min-h-screen' src={roomUrl}></iframe>
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
