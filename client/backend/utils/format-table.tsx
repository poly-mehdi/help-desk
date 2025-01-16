export function getColumnClass(columnId: string): string {
  switch (columnId) {
    case 'email':
      return 'hidden lg:table-cell'
    case 'appName':
      return 'hidden'
    case 'action':
      return 'text-right'
    default:
      return ''
  }
}
