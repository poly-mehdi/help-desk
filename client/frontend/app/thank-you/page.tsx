import { Smile } from 'lucide-react'

function page() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Smile className='mb-4' size={64} />
      <h1 className='text-5xl mb-4'>Thank You!</h1>
      <p className='text-xl'>
        Thank you for using our assistance service. We appreciate your visit.
      </p>
    </div>
  )
}
export default page
