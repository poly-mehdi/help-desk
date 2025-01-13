'use client'

import SessionsCard from '@/components/sessions-card'
import { useSession } from '@/hooks/use-session'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)
import 'react-grid-layout/css/styles.css'

function SessionsPage() {
  const pendingSessions: Session[] = useSession()
  console.log(pendingSessions)
  return (
    <ResponsiveGridLayout
      className='overflow-scroll'
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
      isDraggable={false}
      isResizable={false}
    >
      <div
        key={1}
        data-grid={{ x: 0, y: 0, w: 1, h: 4 }}
        className='flex flex-col gap-4'
      >
        <SessionsCard title='Pending Sessions' sessions={pendingSessions} />
      </div>
      <div
        key={2}
        data-grid={{ x: 1, y: 0, w: 1, h: 4 }}
        className='flex flex-col gap-4 overflow-scroll'
      >
        <SessionsCard title='On Hold Sessions' sessions={pendingSessions} />
      </div>
    </ResponsiveGridLayout>
  )
}
export default SessionsPage
