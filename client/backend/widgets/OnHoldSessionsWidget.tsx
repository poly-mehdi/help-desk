import React, { forwardRef } from 'react'
import SessionsCard from '@/components/sessions-card'
import { SessionsStatusWidget } from '@/types/enum'

interface OnHoldSessionsWidgetProps {
  sessions: Session[]
  dataGrid?: Partial<DataGrid>
  style?: React.CSSProperties
  className?: string
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>
}

const OnHoldSessionsWidget = forwardRef<
  HTMLDivElement,
  OnHoldSessionsWidgetProps
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
        title={'On Hold Sessions'}
        sessions={sessions}
        type={SessionsStatusWidget.OnHold}
      />
    </div>
  )
})

export default OnHoldSessionsWidget
