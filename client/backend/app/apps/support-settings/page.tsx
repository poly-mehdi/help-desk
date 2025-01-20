'use client'

import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbsSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function SupportSettingsPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setBreadCrumbs([
        { label: 'Support Settings', link: 'apps/support-settings' },
      ])
    )
  }, [])
  return <div>SupportSettingsPage</div>
}
export default SupportSettingsPage
