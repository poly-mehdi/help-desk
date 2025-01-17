'use client'

import Grid from '@/widgets/grid'
import { useEffect } from 'react'
import { Layout } from 'react-grid-layout'
import { useDispatch, useSelector } from 'react-redux'
import { Pencil, Save } from 'lucide-react'
import {
  updateLayout,
  loadLayout,
  toggleEditable,
  setPage,
} from '@/features/layout/layoutSlice'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export type Widget = Layout & { type: string }

function SessionsPage() {
  const dispatch = useDispatch()
  const layout = useSelector(
    (state: { layoutState: { layout: Widget[] } }) => state.layoutState.layout
  )
  const editable = useSelector(
    (state: { layoutState: { editable: boolean } }) =>
      state.layoutState.editable
  )

  const handleLayoutChange = (layout: Widget[]) => {
    dispatch(updateLayout(layout))
  }

  useEffect(() => {
    dispatch(loadLayout() as any)
    dispatch(setPage(''))
  }, [])

  return (
    <div>
      <Grid layout={layout} layoutChange={handleLayoutChange} />
      <div className='p-4 fixed bg-sidebar-primary bottom-5 right-5 rounded-full'>
        {editable && (
          <Save
            color='white'
            className='cursor-pointer'
            onClick={() => {
              dispatch(toggleEditable())
            }}
          ></Save>
        )}
        {!editable && (
          <Pencil
            color='white'
            className='cursor-pointer'
            onClick={() => {
              dispatch(toggleEditable())
            }}
          ></Pencil>
        )}
      </div>
    </div>
  )
}
export default SessionsPage
