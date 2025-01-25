import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { socket } from '@/socket'

export const useRoomEvent = (roomUrl: string | null) => {
  const whereByRef = useRef(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const elm = whereByRef.current as
      | (HTMLDivElement & { endMeeting: () => void })
      | null

    if (elm) {
      const handleEvent = (event: any) => {
        if (event.type === 'leave') {
          elm.endMeeting()
        }
        if (event.type === 'meeting_end') {
          socket.emit('endAssistance', {
            participantId: searchParams.get('participantId'),
          })
          router.push('/apps')
        }
      }

      const events = ['meeting_end', 'leave']
      events.forEach((event) => {
        elm.addEventListener(event, handleEvent)
      })
      return () => {
        events.forEach((event) => {
          elm.removeEventListener(event, handleEvent)
        })
      }
    }
  }, [roomUrl])
  return whereByRef
}
