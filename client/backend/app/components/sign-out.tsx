import { signOut } from '@/auth'

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button
        className='bg-slate-600 p-2 rounded-md text-white mt-2'
        type='submit'
      >
        Sign Out
      </button>
    </form>
  )
}
