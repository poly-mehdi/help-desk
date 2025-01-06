'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { socket } from '@/socket'
import { LoadingSpinner } from '@/components/loading'

function RoomPage() {
  const router = useRouter()

  useEffect(() => {
    // const timeout = setTimeout(() => router.push('/session/contact'), 1000)
    const timeout = setTimeout(
      () => console.log('Timeout! Redirecting to /session/contact'),
      1000
    )

    socket.once('advisor.connected', () => {
      console.log('advisor.connected event received, clearing timeout')
      clearTimeout(timeout)
    })

    return () => {
      console.log('Cleaning up timeout')
      clearTimeout(timeout)
    }
  }, [])

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
