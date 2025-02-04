import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { socket } from '@/socket'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ContactDialogProps {
  session: Session
}

const ContactDialog = ({ session }: ContactDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const date = new Date(session.createdAt).toLocaleDateString('fr-FR')
  const time = new Date(session.createdAt).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const router = useRouter()

  useEffect(() => {
    return () => {
      socket.off('session.recalled')
      socket.off('session.recall.failed')
    }
  }, [])

  const handleSubmit = async () => {
    setIsOpen(false)

    toast.promise(
      new Promise((resolve, reject) => {
        socket.emit('sessionRecall', { session: session })

        socket.on('session.recalled', (data: { session: Session }) => {
          resolve('Session recalled successfully')
          router.push(`apps/session/${data.session.id}`)
        })

        socket.on('session.recall.failed', () => {
          reject('Failed to recall session')
        })
      }),
      {
        loading: 'Connecting to the room...',
        success: 'Connected to the room',
        error: 'Failed to connect',
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Client</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col space-y-2'>
          <div className='flex gap-2'>
            <h1 className='font-semibold'>Name:</h1>
            <p>
              {session.participants?.[0]?.firstName}{' '}
              {session.participants?.[0]?.lastName}
            </p>
          </div>
          <div className='flex gap-2'>
            <h1 className='font-semibold'>Email:</h1>
            <p>{session.participants?.[0]?.email}</p>
          </div>
          {session.participants?.[0]?.phone && (
            <div className='flex gap-2'>
              <h1 className='font-semibold'>Phone:</h1>
              <p>{session.participants?.[0]?.phone}</p>
            </div>
          )}
          <div className='flex gap-2'>
            <h1 className='font-semibold'>Date:</h1>
            <p>
              {date} - {time}
            </p>
          </div>
          {session.appName && (
            <div className='flex gap-2'>
              <h1 className='font-semibold'>AppName:</h1>
              <p>{session.appName}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit mail</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContactDialog
