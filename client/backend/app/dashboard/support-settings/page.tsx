'use client'

import { setPage } from '@/features/layout/layoutSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function SupportSettingsPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPage('Support Settings'))
  }, [])
  return <div>SupportSettingsPage</div>
}
export default SupportSettingsPage
