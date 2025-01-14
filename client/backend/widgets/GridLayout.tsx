import React, { ReactElement } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)
import 'react-grid-layout/css/styles.css'

type GridOverlayProps = {
  widgetsProps: ReactElement[]
}

function GridOverlay({ widgetsProps }: GridOverlayProps) {
  const children = React.useMemo(() => {
    return widgetsProps.map((widget, index) => (
      <div key={index} data-grid={{ x: index, y: 0, w: 1, h: 2 }}>
        {widget}
      </div>
    ))
  }, [widgetsProps])

  return (
    <ResponsiveGridLayout
      breakpoints={{ xxl: 1536, xl: 1280, lg: 1024, md: 768, sm: 640 }}
      margin={[20, 10]}
      cols={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1 }}
      isDraggable={true}
      isResizable={true}
    >
      {children}
    </ResponsiveGridLayout>
  )
}
export default GridOverlay
