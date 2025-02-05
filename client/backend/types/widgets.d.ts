type DataWidget = {
  sessions: SessionData[]
}

type SessionData = {
  _uid: number
  path: string
}

type LayoutSliceState = {
  layout: Widget[]
  editable: boolean
}

type Action = {
  title: string
  action?: (session: Session) => void
}
