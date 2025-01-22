import React, { ReactElement } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'

const ReactGridLayout = WidthProvider(RGL)

import GridOutlet from './grid-outlet'
import { Widget } from '@/app/apps/page'
import { useAppSelector } from '@/hooks'

function Grid({
  layout,
  layoutChange,
}: {
  layout: Widget[]
  layoutChange?: (layout: Widget[]) => void
}): ReactElement {
  const editable = useAppSelector(
    (state: { layoutState: { editable: boolean } }) =>
      state.layoutState.editable
  )
  const widgets = React.useMemo(() => {
    return layout.map((widget, index) => (
      <GridOutlet key={index} type={widget.type}></GridOutlet>
    ))
  }, [layout, editable])

  const handleLayoutChange = (layout: Widget[]) => {
    if (layoutChange) {
      layoutChange(layout)
    }
  }

  return (
    <ReactGridLayout
      margin={[10, 10]}
      cols={12}
      layout={layout}
      isDraggable={editable}
      isResizable={editable}
      draggableCancel='.cancelSelectorName'
      onLayoutChange={handleLayoutChange}
      containerPadding={[0, 0]}
    >
      {widgets}
    </ReactGridLayout>
  )
}
export default Grid
