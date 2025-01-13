import { auth } from '@/auth'
import SignIn from '@/components/sign-in'
import { redirect } from 'next/navigation'

async function page() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <SignIn />
      </div>
    )
  }
  return redirect('/dashboard')
}

export default page
