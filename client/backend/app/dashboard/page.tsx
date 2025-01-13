'use client'

import { useSession } from '@/hooks/use-session'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)
import 'react-grid-layout/css/styles.css'

function SessionsPage() {
  const pendingSessions: Session[] = useSession()
  console.log(pendingSessions)
  // const layout = [{ i: '1', x: 0, y: 0, w: 1, h: 1 }]
  return (
    <ResponsiveGridLayout
      className='w-full px-1'
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 1 }}
      isDraggable={false}
      isResizable={false}
    >
      <div key={1} className='flex flex-col gap-4'>
        {pendingSessions.map((session) => (
          <div key={session.id} className='bg-white p-4 rounded-lg shadow-md'>
            <span className='text-lg text-black font-semibold'>
              {session.status}
            </span>
          </div>
        ))}
      </div>
    </ResponsiveGridLayout>
  )
}
export default SessionsPage
