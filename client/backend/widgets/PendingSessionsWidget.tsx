import React, { forwardRef, useEffect } from 'react'
import SessionsCard from '@/components/sessions-card'
import { SessionsStatusWidget } from '@/types/enum'

interface PendingSessionsWidgetProps {
  sessions: Session[]
  dataGrid?: Partial<DataGrid>
  style?: React.CSSProperties
  className?: string
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>
}

const PendingSessionsWidget = forwardRef<
  HTMLDivElement,
  PendingSessionsWidgetProps
>(({ sessions, style, className, onMouseDown, onMouseUp, onTouchEnd }, ref) => {
  return (
    <div
      ref={ref}
      className={`overflow-scroll @container ${className || ''}`}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
    >
      <SessionsCard
        title={'Pending Sessions'}
        sessions={sessions}
        type={SessionsStatusWidget.Pending}
      />
    </div>
  )
})

export default PendingSessionsWidget
