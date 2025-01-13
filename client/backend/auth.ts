import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Keycloak from 'next-auth/providers/keycloak'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Keycloak],
  secret: process.env.NEXTAUTH_SECRET,
})
