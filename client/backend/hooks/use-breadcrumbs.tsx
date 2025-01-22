import {
  BreadCrumbItem,
  setBreadCrumbs,
} from '@/features/breadcrumbs/breadcrumbsSlice'
import { useAppDispatch } from '@/hooks'
import { useEffect } from 'react'

export const useBreadcrumbs = (
  items: BreadCrumbItem[] | (() => BreadCrumbItem[])
) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setBreadCrumbs(typeof items === 'function' ? items() : items))
  }, [])
}
