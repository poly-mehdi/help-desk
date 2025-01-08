import { useEffect, useState } from 'react'
import { socket } from '@/socket'

export const useRoomUrl = () => {
  const [roomUrl, setRoomUrl] = useState<string | null>(() => {
    return localStorage.getItem('roomUrl')
  })

  useEffect(() => {
    if (roomUrl) {
      return
    }

    const timeout = setTimeout(() => {
      console.log('Timeout! Redirecting to /session/contact')
      // Redirection logic here
    }, 30000)

    socket.once('advisor.connected', (assistance: string) => {
      console.log(
        'advisor.connected event received, clearing timeout',
        assistance
      )
      localStorage.setItem('roomUrl', assistance)
      setRoomUrl(assistance)
      clearTimeout(timeout)
    })

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return roomUrl
}
