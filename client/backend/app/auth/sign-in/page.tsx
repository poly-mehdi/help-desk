import { signIn } from '@/auth'

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('keycloak', { redirectTo: '/apps' })
      }}
    >
      <button type='submit'>Sign in</button>
    </form>
  )
}
