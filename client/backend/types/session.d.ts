type Session = {
  id: string
  status: SessionStatus
  isResolved: boolean
  appName?: string
  meetingId?: string
  roomUrl?: string
  hostRoomUrl?: string
  participants?: Participant[]
  createdAt: Date
  updatedAt: Date
}
type Participant = {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: ParticipantRole
  createdAt?: Date
  updatedAt?: Date
}
