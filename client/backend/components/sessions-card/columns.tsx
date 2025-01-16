'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const participant = row.original.participants?.[0]
      return participant
        ? `${participant.firstName} ${participant.lastName}`
        : 'N/A'
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const participant = row.original.participants?.[0]
      return participant ? participant.email : 'N/A'
    },
  },
  {
    accessorKey: 'appName',
    header: 'AppName',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: () => {
      return (
        <div className='flex space-x-2 justify-end'>
          <Button variant='default' onClick={() => {}}>
            Accept
          </Button>
          <Button variant='secondary'>Reject</Button>
        </div>
      )
    },
  },
]
