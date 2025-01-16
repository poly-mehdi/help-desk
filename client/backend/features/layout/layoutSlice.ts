import { Widget } from '@/app/dashboard/page'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialize } from 'next/dist/server/lib/render-server'
import { Layout } from 'react-grid-layout'

type LayoutSliceState = {
  layout: Widget[]
  editable: boolean
  isInitialized?: boolean
}

const defaultState: LayoutSliceState = {
  layout: [
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
  ],
  editable: false,
}

const getLayoutFromLocalStorage = (): LayoutSliceState => {
  const layout: LayoutSliceState = { layout: [], editable: false }
  const storedLayout = localStorage.getItem('layout')
  layout.layout = storedLayout
    ? JSON.parse(storedLayout).layout
    : defaultState.layout
  return layout
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState: getLayoutFromLocalStorage,
  reducers: {
    addWidget(state, action: PayloadAction<Widget>) {
      state.layout.push(action.payload)
    },
    removeWidget(state, action) {
      state.layout = state.layout.filter(
        (widget) => widget.type !== action.payload
      )
    },
    updateLayout(state, action: PayloadAction<Layout[]>) {
      state.layout = state.layout.map((widget) => {
        const updatedLayout = action.payload.find((item) => item.i === widget.i)
        return updatedLayout ? { ...widget, ...updatedLayout } : widget
      })
      localStorage.setItem('layout', JSON.stringify({ layout: state.layout }))
    },
    toggleEditable(state) {
      state.editable = !state.editable
    },
    setEditable(state, action: PayloadAction<boolean>) {
      state.editable = action.payload
    },
  },
})

export const { addWidget, updateLayout, removeWidget, toggleEditable } =
  layoutSlice.actions

export default layoutSlice.reducer
