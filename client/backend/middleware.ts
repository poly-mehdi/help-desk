import { auth } from '@/auth'

const protectedRoutes = ['/apps', '/apps/*']
const publicRoutes = ['/auth/sign-in', '/auth/signup']

// redirect to the login page if the user is not authenticated
export default auth(async (req) => {
  const path = req.nextUrl.pathname
  const isProtectedRoute =
    protectedRoutes.includes(path) ||
    protectedRoutes.some((route) =>
      path.match(new RegExp(`^${route.replace('*', '.*')}$`))
    )
  const isPublicRoute =
    publicRoutes.includes(path) ||
    publicRoutes.some((route) =>
      path.match(new RegExp(`^${route.replace('*', '.*')}$`))
    )

  if (isProtectedRoute && !req.auth) {
    const newUrl = new URL('/auth/sign-in', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (isPublicRoute && req.auth) {
    return Response.redirect('/apps')
  }
})

// avoid redirect any requests made to /_next/*
export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
}
