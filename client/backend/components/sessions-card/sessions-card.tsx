import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SessionsStatusWidget } from '@/types/enum'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

const SessionsCard = ({
  title,
  type,
}: {
  title: string
  type: SessionsStatusWidget
}) => {
  const allSessions = useSelector(
    (state: { sessionState: { sessions: Session[] } }) =>
      state.sessionState.sessions
  )
  const sessions = useMemo(
    () => allSessions.filter((session) => session.status === 'In Progress'),
    [allSessions, type]
  )

  return (
    <Card className='bg-sidebar @container h-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={sessions} />
      </CardContent>
    </Card>
  )
}
export default SessionsCard
