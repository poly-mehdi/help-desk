'use client'

import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbsSlice'
import { useAppDispatch } from '@/hooks'
import { useEffect } from 'react'

function SupportSettingsPage() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      setBreadCrumbs([
        { label: 'Support Settings', link: 'apps/support-settings' },
      ])
    )
  }, [dispatch])
  return <div>SupportSettingsPage</div>
}
export default SupportSettingsPage
