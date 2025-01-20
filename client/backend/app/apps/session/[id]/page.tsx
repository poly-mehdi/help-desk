'use client'

import { useRoomEvent } from '@/hooks/use-room-event'
import { useRoomUrl } from '@/hooks/use-room-url'
import { Loader2 } from 'lucide-react'

import '@whereby.com/browser-sdk/embed'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { useParams } from 'next/navigation'

function RoomPage() {
  const { id: sessionId } = useParams()
  const roomUrl = useRoomUrl()
  const wherebyRef = useRoomEvent(roomUrl)
  useBreadcrumbs([
    { label: 'Session', link: '/apps/session' },
    { label: 'Assistance', link: `/apps/session/${sessionId}` },
  ])

  if (roomUrl) {
    return (
      <whereby-embed
        ref={wherebyRef}
        data-testid='whereby-embed'
        room={roomUrl}
        style={{ width: '100%', height: `calc(100vh - 4rem)` }}
      />
    )
  }
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
      <Loader2 className='animate-spin' size={100} />
    </div>
  )
}
export default RoomPage
