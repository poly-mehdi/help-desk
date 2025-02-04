import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type BreadCrumbSlice = {
  items: BreadCrumbItem[]
}

export type BreadCrumbItem = {
  label: string
  link: string
}

const defaultState: BreadCrumbSlice = {
  items: [],
}

export const breadCrumbSlice = createSlice({
  name: 'breadCrumb',
  initialState: defaultState,
  reducers: {
    setBreadCrumbs: (state, action: PayloadAction<BreadCrumbItem[]>) => {
      state.items = action.payload
    },
  },
})

export const { setBreadCrumbs } = breadCrumbSlice.actions

export default breadCrumbSlice.reducer
