import { auth } from '@/auth'
import SignIn from './components/sign-in'
import { SignOut } from './components/sign-out'

async function page() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <SignIn />
      </div>
    )
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>Welcome {session.user.name}</h1>
      <SignOut />
    </div>
  )
}

export default page
