import { signIn } from '@/auth'

export default function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn(provider, { redirectTo: '/dashboard' })
      }}
    >
      <button className='bg-slate-600 p-2 rounded-md text-white' type='submit'>
        Sign In
      </button>
    </form>
  )
}
