import { redirect } from 'next/navigation'

async function page() {
  return redirect('/apps')
}

export default page
