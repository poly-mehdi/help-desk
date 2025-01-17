import { auth } from '@/auth'

// redirect to the login page if the user is not authenticated
export default auth((req) => {
  // if (!req.auth && req.nextUrl.pathname !== '/') {
  //   const newUrl = new URL('/', req.nextUrl.origin)
  //   return Response.redirect(newUrl)
  // }
})

// avoid redirect any requests made to /_next/*
export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
}
