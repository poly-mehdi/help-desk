'use client'

import { useSessions } from '@/hooks/use-sessions'
import GridOverlay from '@/widgets/GridLayout'
import OnHoldSessionsWidget from '@/widgets/OnHoldSessionsWidget'
import PendingSessionsWidget from '@/widgets/PendingSessionsWidget'

function SessionsPage() {
  const { pendingSessions, onHoldSessions } = useSessions()

  const widgets = [
    <PendingSessionsWidget sessions={pendingSessions} />,
    <OnHoldSessionsWidget sessions={onHoldSessions} />,
  ]

  return <GridOverlay widgetsProps={widgets} />
}
export default SessionsPage
