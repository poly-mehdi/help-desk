import {
  BreadCrumbItem,
  setBreadCrumbs,
} from '@/features/breadcrumbs/breadcrumbsSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useBreadcrumbs = (
  items: BreadCrumbItem[] | (() => BreadCrumbItem[])
) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBreadCrumbs(typeof items === 'function' ? items() : items))
  }, [])
}
