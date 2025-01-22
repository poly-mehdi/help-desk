import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { useRouter, useParams, useSearchParams } from 'next/navigation'

export const useRoomUrl = () => {
  const [roomUrl, setRoomUrl] = useState<string | null>(null)
  const router = useRouter()
  const { id: sessionId } = useParams()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (roomUrl) {
      return
    }

    let timeoutId: any

    socket.once(
      'participant.joined',
      (data: { roomUrl: string; timeoutDuration: number }) => {
        if (data.roomUrl) {
          setRoomUrl(data.roomUrl)
        } else {
          timeoutId = setTimeout(() => {
            router.push(
              `/session/contact?sessionId=${sessionId}&participantId=${searchParams.get(
                'participantId'
              )}`
            )
          }, data.timeoutDuration)
        }
      }
    )

    socket.once('assistance.started', (data: { roomUrl: string }) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      setRoomUrl(data.roomUrl)
    })

    socket.emit('joinSession', {
      sessionId: sessionId,
      participantId: searchParams.get('participantId'),
    })
    return () => {
      socket.off('participant.joined')
      socket.off('assistance.started')
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }
  }, [])

  return roomUrl
}
