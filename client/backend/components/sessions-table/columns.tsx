'use client';

import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Session>[] = [
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
];

