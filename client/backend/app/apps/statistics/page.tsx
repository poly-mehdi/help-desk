'use client'

import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbsSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function StatisticsPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setBreadCrumbs([{ label: 'Statistics', link: '/apps/statistics' }])
    )
  }, [])
  return <div>StatisticsPage</div>
}
export default StatisticsPage
