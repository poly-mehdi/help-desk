'use client'

import { usePathname } from 'next/navigation'

function RoomPage() {
  const pathname = usePathname()

  return (
    <div>
      <h1>Room Page</h1>
      <p>Pathname: {pathname}</p>
    </div>
  )
}

export default RoomPage
