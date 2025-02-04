export function getColumnClass(columnId: string): string {
  switch (columnId) {
    case 'email':
      return 'hidden @md:table-cell'
    case 'createdAt':
      return 'hidden @2xl:table-cell'
    case 'appName':
      return 'hidden @5xl:table-cell'
    case 'action':
      return 'text-right'
    default:
      return ''
  }
}
