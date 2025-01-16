export const formatBreadcrumb = (path: string): string | undefined => {
  let pathFormatted = path.split('/').findLast((item) => item !== '')
  if (pathFormatted === 'dashboard') return 'Sessions'
  else {
    if (pathFormatted) {
      pathFormatted = pathFormatted.replace('-', ' ')
      pathFormatted =
        pathFormatted.charAt(0).toUpperCase() + pathFormatted.slice(1)
    }
    return pathFormatted
  }
}
