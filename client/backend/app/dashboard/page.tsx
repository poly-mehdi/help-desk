'use client'

import { useSessions } from '@/hooks/use-sessions'
import Grid from '@/widgets/grid'
import { useEffect, useState } from 'react'
import { Layout } from 'react-grid-layout'
import { useSelector } from 'react-redux'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export type Widget = Layout & { type: string }

function SessionsPage() {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const layout = useSelector(
    (state: { layoutState: { layout: Widget[] } }) => state.layoutState.layout
  )

  useSessions()

  useEffect(() => {
    if (layout) {
      setWidgets(layout)
    }
  }, [layout])

  return <Grid layout={widgets} />
}
export default SessionsPage
