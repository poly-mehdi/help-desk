import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { useRouter } from 'next/navigation'

export const useRoomUrl = () => {
  const [roomUrl, setRoomUrl] = useState<string | null>(() => {
    return localStorage.getItem('roomUrl')
  })
  const router = useRouter()

  useEffect(() => {
    if (roomUrl) {
      return
    }

    const timeout = setTimeout(() => {
      router.push('/session/contact')
    }, 30000)

    socket.once('advisor.connected', (assistance: string) => {
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
