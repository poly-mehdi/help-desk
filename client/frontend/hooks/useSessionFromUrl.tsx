import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { socket } from '@/socket'

const useSessionFromUrl = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const firstName = searchParams.get('firstName')
    const lastName = searchParams.get('lastName')
    const email = searchParams.get('email')
    const appName = searchParams.get('appName')

    if (firstName && lastName && email && appName) {
      const values = { firstName, lastName, email, appName }

      socket.once(
        'createSession',
        (data: { sessionId: string; participantId: string }) => {
          router.push(
            `/session/${data.sessionId}?participantId=${data.participantId}`
          )
        }
      )
      socket.emit('createSession', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        appName: values.appName,
      })
    }
  }, [])
}
export default useSessionFromUrl
