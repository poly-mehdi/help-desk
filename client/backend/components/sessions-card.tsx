import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getParticipantName } from '@/utils/get-participant-name'
import { Button } from './ui/button'
import { socket } from '@/socket'
import { SessionsStatusWidget } from '@/types/enum'

const SessionsCard = ({
  title,
  type,
}: {
  title: string
  type: SessionsStatusWidget
}) => {
  const sessions = [
    {
      createdAt: '2025-01-09T15:13:28.403Z',
      id: '677fe7985dd0f10dae6f967a',
      isResolved: false,
      meetingId: '95259819',
      appName: 'Zoom',
      participants: [
        {
          id: '677fe7985dd0f10dae6f967d',
          firstName: 'Mehdi',
          lastName: 'Sehad',
          email: 'sehad.mehdi@gmail.com',
          role: 'Customer',
        },
      ],
      status: 'Pending',
    },
  ]
  return (
    <Card className='bg-sidebar @container h-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table scrollable={true}>
          <TableCaption>Total Sessions: {sessions.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className='hidden @xl:table-cell'>Email</TableHead>
              {/* <TableHead className='hidden @2xl:table-cell'>Date</TableHead> */}
              <TableHead className='hidden @3xl:table-cell'>AppName</TableHead>
              <TableHead className='text-right pr-4 @xl:text-left @xl:p-0'>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  {session.participants &&
                    getParticipantName(session.participants?.[0])}
                </TableCell>
                <TableCell className='hidden @xl:table-cell'>
                  {session.participants && session.participants?.[0].email}
                </TableCell>

                {/* <TableCell className='hidden @2xl:table-cell'>
                  {formatDate(new Date(session.createdAt).toISOString())}
                </TableCell> */}
                <TableCell className='hidden @3xl:table-cell'>
                  {session.participants && session.appName
                    ? session.appName
                    : 'N/A'}
                </TableCell>
                {type === SessionsStatusWidget.Pending ? (
                  <TableCell className='flex space-x-2 justify-end @xl:justify-normal'>
                    <Button
                      variant='default'
                      onClick={() => {
                        socket.emit('startAssistance', {
                          sessionId: session.id,
                        })
                      }}
                    >
                      Accept
                    </Button>
                    <Button variant='secondary'>Reject</Button>
                  </TableCell>
                ) : (
                  <TableCell className='flex space-x-2 justify-end @xl:justify-normal'>
                    <Button variant='default'>Call Back</Button>
                    <Button variant='secondary'>Cancel</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    // <div className='bg-red-500 h-full w-full'>hello</div>
  )
}
export default SessionsCard
