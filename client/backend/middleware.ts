import { auth } from '@/auth';

const protectedRoutes = ['/apps', '/apps/*'];
const publicRoutes = ['/auth/signin', '/auth/signup', '/auth/signout'];

// redirect to the login page if the user is not authenticated
export default auth(async (req) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.includes(path) ||
    protectedRoutes.some((route) =>
      path.match(new RegExp(`^${route.replace('*', '.*')}$`))
    );
  const isPublicRoute =
    publicRoutes.includes(path) ||
    publicRoutes.some((route) =>
      path.match(new RegExp(`^${route.replace('*', '.*')}$`))
    );

  if (isProtectedRoute && !req.auth) {
    const newUrl = new URL('/auth/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (isPublicRoute && req.auth) {
    const url = new URL('/apps', req.nextUrl.origin);
    return Response.redirect(url);
  }
});

// avoid redirect any requests made to /_next/*
export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
};
