import { Widget } from '@/app/dashboard/page'
import { socket } from '@/socket'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Layout } from 'react-grid-layout'

type LayoutSliceState = {
  // sessions: Widget[]
  layout: Widget[]
  editable: boolean
  busy: boolean
}

const defaultState: LayoutSliceState = {
  layout: [],
  editable: false,
  busy: false,
}

export const loadLayout = createAsyncThunk('layout/fetchLayout', async () => {
  const content = localStorage.getItem('layout')
  const widgets: Widget[] = content
    ? JSON.parse(content)
    : [
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
      ]
  return widgets
})

export const saveLayout = createAsyncThunk(
  'layout/saveLayout',
  async (layout: Widget[]) => {
    localStorage.setItem('layout', JSON.stringify(layout))
  }
)

const layoutSlice = createSlice({
  name: 'layout',
  initialState: defaultState,
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
    },
    toggleEditable(state) {
      state.editable = !state.editable
    },
    setEditable(state, action: PayloadAction<boolean>) {
      state.editable = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadLayout.pending, (state, action) => {
      console.log('Loading layout...')
      state.busy = true
    })
    builder.addCase(loadLayout.fulfilled, (state, action) => {
      state.layout = action.payload
      state.busy = false
    })
    builder.addCase(saveLayout.pending, (state, action) => {
      console.log('Layout saving...')
      state.busy = false
    })
    builder.addCase(saveLayout.fulfilled, (state, action) => {
      console.log('Layout saved')
      state.busy = true
    })
  },
})

export const { addWidget, updateLayout, removeWidget, toggleEditable } =
  layoutSlice.actions

export default layoutSlice.reducer
