import { useEffect, useRef, useState } from 'react'
import { socket } from '@/socket'
import { useParams } from 'next/navigation'

export const useRoomUrl = () => {
  const [roomUrl, setRoomUrl] = useState<string | null>(null)
  const { id: sessionId } = useParams()
  const hasEmitted = useRef(false)

  useEffect(() => {
    if (roomUrl) {
      return
    }
    socket.on('assistance.started', (data: { hostRoomUrl: string }) => {
      console.log('hostRoomUrl', data.hostRoomUrl)
      setRoomUrl(data.hostRoomUrl)
    })
    if (!hasEmitted.current) {
      socket.emit('startAssistance', { sessionId: sessionId })
      hasEmitted.current = true
    }
    return () => {
      socket.off('participant.joined')
      socket.off('assistance.started')
    }
  }, [])

  return roomUrl
}
