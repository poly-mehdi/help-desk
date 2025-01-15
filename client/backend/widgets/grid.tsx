import React, { ReactElement } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { Scaling } from 'lucide-react'

const ReactGridLayout = WidthProvider(RGL)

import GridOutlet from './grid-outlet'
import { Widget } from '@/app/dashboard/page'

function Grid({ layout }: { layout: Widget[] }): ReactElement {
  const widgets = React.useMemo(() => {
    return layout.map((widget, index) => (
      <GridOutlet key={index} type={widget.type}></GridOutlet>
    ))
  }, [layout])

  return (
    <ReactGridLayout
      margin={[10, 10]}
      cols={12}
      layout={layout}
      isDraggable={true}
      isResizable={true}
      rowHeight={105}
    >
      {widgets}
    </ReactGridLayout>
  )
}
export default Grid
