export const formatDate = (isoString: string): string => {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
  return date.toLocaleDateString('fr-FR', options)
}
