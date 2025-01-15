import SessionsCard from '@/components/sessions-card'
import { SessionsStatusWidget } from '@/types/enum'

function PendingSessionsWidget() {
  return (
    <div className='overflow-scroll h-full'>
      <SessionsCard
        title={'Pending Sessions'}
        type={SessionsStatusWidget.Pending}
      />
    </div>
  )
}

export default PendingSessionsWidget
