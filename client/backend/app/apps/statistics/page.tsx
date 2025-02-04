'use client'

import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbsSlice'
import { useAppDispatch } from '@/hooks'
import { useEffect } from 'react'

function StatisticsPage() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      setBreadCrumbs([{ label: 'Statistics', link: '/apps/statistics' }])
    )
  }, [dispatch])
  return <div>StatisticsPage</div>
}
export default StatisticsPage
