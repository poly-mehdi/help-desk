'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { HoverCard, HoverCardTrigger } from '@radix-ui/react-hover-card'
import { HoverCardContent } from '../ui/hover-card'
import ContactDialog from '../contact-dialog'

export const columns = (actions: Action[]): ColumnDef<Session>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }: { row: { original: Session } }) => {
      const participant = row.original.participants?.[0]
      const date = new Date(row.original.createdAt)
      return (
        <HoverCard>
          <HoverCardTrigger>
            {participant
              ? `${participant.firstName} ${participant.lastName}`
              : 'N/A'}
          </HoverCardTrigger>
          <HoverCardContent align='start'>
            <div className='flex flex-col space-y-2'>
              <div>
                <span className='font-semibold'>First Name:</span>{' '}
                {participant?.firstName}
              </div>
              <div>
                <span className='font-semibold'>Last Name:</span>{' '}
                {participant?.lastName}
              </div>
              <div>
                <span className='font-semibold'>Email:</span>{' '}
                {participant?.email}
              </div>
              <div>
                <span className='font-semibold'>Date:</span>{' '}
                {date.toLocaleDateString('fr-FR')}
              </div>
              <div>
                <span className='font-semibold'>AppName:</span>{' '}
                {row.original.appName}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }: { row: { original: Session } }) => {
      const participant = row.original.participants?.[0]
      return participant ? participant.email : 'N/A'
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }: { row: { original: Session } }) => {
      const date = new Date(row.original.createdAt)
      return date.toLocaleDateString('fr-FR')
    },
  },
  {
    accessorKey: 'appName',
    header: 'AppName',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }: { row: { original: Session } }) => {
      return (
        <div className='flex space-x-2 justify-end'>
          {actions.map((action: Action, index: number) => {
            const variant = index === 0 ? 'default' : 'secondary'
            console.log('action', action)

            if (!action.action) {
              console.log('contact dialog')
              return <ContactDialog key={index} session={row.original} />
            }
            return (
              <Button
                key={index}
                variant={variant}
                onClick={() => action.action && action.action(row.original)}
              >
                {action.title}
              </Button>
            )
          })}
        </div>
      )
    },
  },
]
