import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SessionsStatusWidget } from '@/types/enum'

import { columns } from './columns'
import { DataTable } from './data-table'
import { ScrollArea } from '@radix-ui/react-scroll-area'

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
    <Card className='bg-primary-foreground @container h-full pb-4'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className=' h-4/5 overflow-scroll'>
        <DataTable columns={columns(actions)} data={sessions} />
      </CardContent>
    </Card>
  )
}
export default SessionsCard
