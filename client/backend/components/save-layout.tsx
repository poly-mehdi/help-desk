'use client'

import * as React from 'react'
import { Save } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function SaveLayout() {
  const dispatch = useDispatch()

  return (
    <Button
      variant='ghost'
      className='group/toggle h-8 w-8 px-0'
      onClick={() => toast.success('Layout saved!')}
    >
      <Save size={14} className='cursor-pointer' />
      <span className='sr-only'>Save Layout</span>
    </Button>
  )
}
