'use client'

import { setPage } from '@/features/layout/layoutSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function StatisticsPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPage('Statistics'))
  }, [])
  return <div>StatisticsPage</div>
}
export default StatisticsPage
