import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from './ui/scroll-area'
import { getParticipantName } from '@/utils/get-participant-name'
import { formatDate } from '@/utils/format-date'
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
      <CardContent>
        <ScrollArea className='h-[375px] rounded-sm border'>
          <Table scrollable={true}>
            <TableHeader sticky={true}>
              <TableRow>
                <TableHead>Name</TableHead>
                {/* <TableHead className='hidden md:table-cell lg:hidden xl:table-cell'> */}
                <TableHead className='hidden @xl:table-cell'>Email</TableHead>
                <TableHead className='hidden @2xl:table-cell'>Date</TableHead>
                <TableHead className='text-right pr-4'>Action</TableHead>
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
                  <TableCell className='hidden @2xl:table-cell'>
                    {formatDate(new Date(session.createdAt).toISOString())}
                  </TableCell>
                  <TableCell className='flex space-x-2 justify-end'>
                    <Button variant='default'>Accept</Button>
                    <Button variant='secondary'>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter sticky={true}>
              <TableRow>
                <TableCell>Total Sessions</TableCell>
                <TableCell className='hidden @xl:table-cell' />
                <TableCell className='hidden @2xl:table-cell' />
                <TableCell className='text-right pr-5'>
                  {sessions.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
export default SessionsCard
