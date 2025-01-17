import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SessionsStatusWidget } from '@/types/enum'

import { columns } from './columns'
import { DataTable } from './data-table'

const SessionsCard = ({
  title,
  sessions,
  actions,
}: {
  title: string
  sessions: Session[]
  actions: { title: string; action: (session: Session) => void }[]
}) => {
  return (
    <Card className='bg-sidebar @container h-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns(actions)} data={sessions} />
      </CardContent>
    </Card>
  )
}
export default SessionsCard
