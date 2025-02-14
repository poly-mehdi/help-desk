import Link from 'next/link';

export default function SignOut() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-3xl mb-2'>You have been logged out!</h1>
      <div className='flex gap-2'>
        <p>Do you want to reconnect ?</p>
        <Link href='/'>Click here</Link>
      </div>
    </div>
  );
}

