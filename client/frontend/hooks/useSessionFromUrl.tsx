import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const useSessionFromUrl = () => {
  const searchParams = useSearchParams()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [appName, setAppName] = useState('')

  useEffect(() => {
    setFirstName(searchParams.get('firstName') || '')
    setLastName(searchParams.get('lastName') || '')
    setEmail(searchParams.get('email') || '')
    setAppName(searchParams.get('appName') || '')
  }, [])

  return {
    firstName,
    lastName,
    email,
    appName,
  }
}
export default useSessionFromUrl

