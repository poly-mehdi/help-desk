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
    socket.once('assistance.started', (data: { roomUrl: string }) => {
      setRoomUrl(data.roomUrl)
    })
    socket.emit('startAssistance', sessionId)
    return () => {
      socket.off('participant.joined')
      socket.off('assistance.started')
    }
  }, [])

  return roomUrl
}
