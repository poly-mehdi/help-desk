'use client'

import * as React from 'react'
import { Pencil } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toggleEditable } from '@/features/layout/layoutSlice'
import { Button } from '@/components/ui/button'

export function EditSwitcher() {
  const dispatch = useDispatch()

  return (
    <Button
      variant='ghost'
      className='group/toggle h-8 w-8 px-0'
      onClick={() => dispatch(toggleEditable())}
    >
      <Pencil size={14} className='cursor-pointer' />
      <span className='sr-only'>Toggle Edit Mode</span>
    </Button>
  )
}
