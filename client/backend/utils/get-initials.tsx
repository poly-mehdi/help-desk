export function getInitials(name: string | undefined | null) {
  if (!name) return ''
  const parts = name.split(' ')
  return parts.map((part) => part.charAt(0)).join('')
}
