import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'

const SessionsCard = ({
  title,
  sessions,
}: {
  title: string
  sessions: Session[]
}) => {
  return (
    <Card className='bg-sidebar'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='overflow-scroll h-[60vh]'>
        <div className='flex flex-col gap-4'>
          {sessions.map((session) => (
            <div
              key={session.id}
              className='flex justify-between items-center px-4 py-2 border-b-2 border-white'
            >
              <div className='flex flex-col gap-2'>
                <div className='flex gap-1'>
                  <CardDescription className='text-foreground'>
                    {session.participants && session.participants[0]?.firstName}
                  </CardDescription>
                  <CardDescription className='text-foreground'>
                    {session.participants && session.participants[0]?.lastName}
                  </CardDescription>
                </div>
                <CardDescription className='text-foreground'>
                  {session.participants && session.participants[0]?.email}
                </CardDescription>
              </div>
              <div className='flex gap-2 items-center'>
                <Button variant='default' size='sm'>
                  Accept
                </Button>
                <Button variant='secondary' size='sm'>
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
export default SessionsCard
