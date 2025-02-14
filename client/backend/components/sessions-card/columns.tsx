'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';

import ContactDialog from '../contact-dialog';

export const columns = (actions: Action[]): ColumnDef<Session>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }: { row: { original: Session } }) => {
      const participant = row.original.participants?.[0];
      return participant
        ? `${participant.firstName} ${participant.lastName}`
        : 'N/A';
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }: { row: { original: Session } }) => {
      const participant = row.original.participants?.[0];
      return participant ? participant.email : 'N/A';
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }: { row: { original: Session } }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString('fr-FR');
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
            const variant = index === 0 ? 'default' : 'secondary';

            if (!action.action) {
              return <ContactDialog key={index} session={row.original} />;
            }
            return (
              <Button
                key={index}
                variant={variant}
                onClick={() => action.action && action.action(row.original)}
              >
                {action.title}
              </Button>
            );
          })}
        </div>
      );
    },
  },
];
