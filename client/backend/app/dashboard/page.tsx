'use client'

import Grid from '@/widgets/grid'
import { useEffect } from 'react'
import { Layout } from 'react-grid-layout'
import { useDispatch, useSelector } from 'react-redux'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { updateLayout, loadLayout } from '@/features/layout/layoutSlice'

export type Widget = Layout & { type: string }

function SessionsPage() {
  const dispatch = useDispatch()
  const layout = useSelector(
    (state: { layoutState: { layout: Widget[] } }) => state.layoutState.layout
  )
  const handleLayoutChange = (layout: Widget[]) => {
    dispatch(updateLayout(layout))
  }

  useEffect(() => {
    dispatch(loadLayout() as any)
  }, [])

  return <Grid layout={layout} layoutChange={handleLayoutChange} />
}
export default SessionsPage
