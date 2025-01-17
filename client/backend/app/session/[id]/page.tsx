// import { useState } from 'react'
// import '@whereby.com/browser-sdk/embed'
// import { useRoomUrl } from '@/hooks/use-room-url'
// import { useRoomEvent } from '@/hooks/use-room-event'

// function RoomPage() {
//   const roomUrl = useRoomUrl()
//   const wherebyRef = useRoomEvent(roomUrl)

//   if (roomUrl) {
//     return (
//       <whereby-embed
//         ref={wherebyRef}
//         data-testid='whereby-embed'
//         room={roomUrl}
//         style={{ width: '100%', height: '100vh' }}
//       />
//     )
//   }
//   return (
//     <div className='flex min-h-svh flex-col items-center justify-center'>
//       <div className='flex flex-col items-center'>
//         <h1 className='text-2xl mb-10'>Connection to the room ...</h1>
//         <LoadingSpinner size={100} data-testid='loading-spinner' />
//       </div>
//     </div>
//   )
// }
// export default RoomPage

function page() {
  return <div>page</div>
}
export default page
