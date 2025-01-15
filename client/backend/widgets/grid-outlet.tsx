import { WIDGET_TYPES } from '@/app/dashboard/page'
import { createElement, forwardRef } from 'react'
import { Trash, CircleX } from 'lucide-react'

interface GridOutletProps {
  style?: React.CSSProperties
  className?: string
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>
  type: string
  children?: React.ReactNode
}

const GridOutlet = forwardRef<HTMLDivElement, GridOutletProps>(
  ({ type, children, ...other }, ref) => {
    let component

    if (!type) {
      console.log('No type provided')
      return
    }

    let widget = WIDGET_TYPES.find((widget) => widget.name === type)?.component
    if (widget) {
      component = createElement(widget)
    } else {
      return <div>Widget not found</div>
    }

    return (
      <div ref={ref} {...other}>
        <div className='relative h-full'>
          <CircleX
            className='absolute top-4 right-4 cursor-pointer'
            size={30}
          />
          <div className='h-full'>{component}</div>
        </div>
        {children}
      </div>
    )
  }
)
export default GridOutlet
