import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import RoomPage from './page'
import { MockSocketProvider } from '../../providers/socket-provider.mock'
import { useRoomUrl } from '../../../hooks/useRoomUrl'
import { useRoomEvent } from '../../../hooks/useRoomEvent'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn(),
    }
  },
}))
jest.mock('../../../hooks/useRoomUrl')
const mockUseRoomUrl = jest.mocked(useRoomUrl)
jest.mock('../../../hooks/useRoomEvent')
const mockUseRoomEvent = jest.mocked(useRoomEvent)

describe('RoomPage', () => {
  test('renders loading screen', () => {
    mockUseRoomUrl.mockReturnValue(null)

    render(
      <MockSocketProvider>
        <RoomPage />
      </MockSocketProvider>
    )
    expect(
      screen.getByText(
        'An advisor will be with you shortly. Thank you for your patience.'
      )
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  test('renders whereby-embed when roomUrl is available', () => {
    mockUseRoomUrl.mockReturnValue('https://website.com/sessionId')
    mockUseRoomEvent.mockReturnValue({ current: null })

    render(
      <MockSocketProvider>
        <RoomPage />
      </MockSocketProvider>
    )
    expect(screen.getByTestId('whereby-embed')).toBeInTheDocument()
    expect(mockUseRoomEvent).toHaveBeenCalledWith(
      'https://website.com/sessionId'
    )
  })
})
