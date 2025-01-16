import SessionsCard from '@/components/sessions-card/sessions-card'
import { SessionsStatusWidget } from '@/types/enum'

function OnHoldSessionsWidget() {
  return (
    <div className='overflow-scroll @container h-full'>
      <SessionsCard
        title={'On Hold Sessions'}
        type={SessionsStatusWidget.OnHold}
      />
    </div>
  )
}

export default OnHoldSessionsWidget
