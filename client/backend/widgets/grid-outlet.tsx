import { createElement, forwardRef } from 'react';
import OnHoldSessionsWidget from '@/widgets/sessions/on-hold-sessions.widget';
import PendingSessionsWidget from '@/widgets/sessions/pending-sessions.widget';
import { useAppSelector } from '@/hooks';

interface GridOutletProps {
  style?: React.CSSProperties;
  className?: string;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
  type: string;
  children?: any;
}

export const WIDGET_TYPES = [
  {
    name: 'pending-sessions',
    component: () => <PendingSessionsWidget />,
    // size: () => ({ w: 3, h: 2, minW: 3, minH: 2 }),
  },
  {
    name: 'on-hold-sessions',
    component: () => <OnHoldSessionsWidget />,
  },
];

const GridOutlet = forwardRef<HTMLDivElement, GridOutletProps>(
  ({ type, children, className, ...other }, ref) => {
    let component;

    if (!type) {
      console.log('No type provided');
      return;
    }

    let widget = WIDGET_TYPES.find((widget) => widget.name === type)?.component;
    if (widget) {
      component = createElement(widget);
    } else {
      return <div>Widget not found</div>;
    }

    const editable = useAppSelector(
      (state: { dashboardState: { editable: boolean } }) =>
        state.dashboardState.editable
    );

    return (
      <div ref={ref} {...other} className={`${className} relative`}>
        <div className='h-full'>{component}</div>
        {editable && (
          <div className='absolute top-0 left-0 h-full w-full rounded-xl bg-edit opacity-edit cursor-move'>
            {children.length && children[1]}
          </div>
        )}
      </div>
    );
  }
);
export default GridOutlet;

