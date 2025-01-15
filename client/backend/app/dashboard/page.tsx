'use client'

import { useSessions } from '@/hooks/use-sessions'
import Grid from '@/widgets/grid'
import OnHoldSessionsWidget from '@/widgets/sessions/on-hold-sessions.widget'
import PendingSessionsWidget from '@/widgets/sessions/pending-sessions.widget'
import { useEffect, useState } from 'react'
import { Layout } from 'react-grid-layout'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export const WIDGET_TYPES = [
  {
    name: 'pending-sessions',
    component: () => <PendingSessionsWidget />,
  },
  {
    name: 'on-hold-sessions',
    component: () => <OnHoldSessionsWidget />,
  },
]

export type Widget = Layout & { type: string }

function loadWidgets(): Promise<Widget[]> {
  return Promise.resolve([
    {
      i: '0',
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      minW: 3,
      minH: 2,
      type: 'pending-sessions',
    },
    {
      i: '1',
      x: 3,
      y: 0,
      w: 3,
      h: 2,
      minW: 3,
      minH: 2,
      type: 'on-hold-sessions',
    },
    {
      i: '2',
      x: 6,
      y: 0,
      w: 3,
      h: 2,
      minW: 3,
      minH: 2,
      type: 'on-hold-sessions',
    },
    {
      i: '3',
      x: 9,
      y: 0,
      w: 3,
      h: 2,
      minW: 3,
      minH: 2,
      type: 'on-hold-sessions',
    },
  ])
}

function SessionsPage() {
  const [widgets, setWidgets] = useState<Widget[]>([])
  useSessions()

  useEffect(() => {
    loadWidgets().then((widgets) => setWidgets(widgets))
  }, [])

  return <Grid layout={widgets} />
}
export default SessionsPage
