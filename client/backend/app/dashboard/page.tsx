'use client'

import SessionsCard from '@/components/sessions-card'
import { useSessions } from '@/hooks/use-sessions'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)
import 'react-grid-layout/css/styles.css'

function SessionsPage() {
  const pendingSessions: Session[] = useSessions()

  return (
    <ResponsiveGridLayout
      breakpoints={{ xxl: 1536, xl: 1280, lg: 1024, md: 768, sm: 640 }}
      cols={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1 }}
      isDraggable={false}
      // isResizable={false}
    >
      <div
        key={1}
        className='overflow-scroll @container'
        data-grid={{ x: 0, y: 0, w: 1, h: 3 }}
      >
        <SessionsCard title='Pending Sessions' sessions={pendingSessions} />
      </div>
      <div
        key={2}
        data-grid={{ x: 1, y: 0, w: 1, h: 3 }}
        className='overflow-scroll @container'
      >
        <SessionsCard title='On Hold Sessions' sessions={pendingSessions} />
      </div>
    </ResponsiveGridLayout>
  )
}
export default SessionsPage
