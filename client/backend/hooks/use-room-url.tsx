import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { useParams } from 'next/navigation'

export const useRoomUrl = () => {
  const [roomUrl, setRoomUrl] = useState<string | null>(null)
  const { id: sessionId } = useParams()

  useEffect(() => {
    if (roomUrl) {
      return
    }
    socket.on('assistance.started', (data: { hostRoomUrl: string }) => {
      setRoomUrl(data.hostRoomUrl)
    })
    socket.emit('startAssistance', { sessionId: sessionId })

    return () => {
      socket.off('participant.joined')
      socket.off('assistance.started')
    }
  }, [sessionId])

  return roomUrl
}
