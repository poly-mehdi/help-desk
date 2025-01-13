export function getInitials(name: string) {
  const parts = name.split(' ')
  return parts.map((part) => part.charAt(0)).join('')
}
