import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ContactDialogProps {
  session: Session
}

const ContactDialog = ({ session }: ContactDialogProps) => {
  const date = new Date(session.createdAt).toLocaleDateString('fr-FR')
  const time = new Date(session.createdAt).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <Dialog>
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
          <div className='flex gap-2'>
            <h1 className='font-semibold'>Phone:</h1>
            <p>{session.participants?.[0]?.phone}</p>
          </div>
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
          <Button>Submit mail</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default ContactDialog
