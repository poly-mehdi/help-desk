// useRoomUrl.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useRoomUrl } from '@/hooks/useRoomUrl'
import { socket } from '@/socket'
import { useRouter, useParams, useSearchParams } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
}))

jest.mock('../socket', () => ({
  socket: {
    once: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  },
}))

const mockPush = jest.fn()
let socketHandlers: Record<string, (data: any) => void> = {}

describe('useRoomUrl', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useParams as jest.Mock).mockReturnValue({ id: 'session123' })
    ;(useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('participantId=participant456')
    )
    ;(socket.once as jest.Mock).mockImplementation((event, handler) => {
      socketHandlers[event] = handler
    })
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('emits joinSession with correct params on mount', () => {
    renderHook(() => useRoomUrl())

    expect(socket.emit).toHaveBeenCalledWith('joinSession', {
      sessionId: 'session123',
      participantId: 'participant456',
    })
  })

  //   test('updates roomUrl when participant.joined includes roomUrl', () => {
  //     const { result } = renderHook(() => useRoomUrl())

  //     act(() => {
  //       socketHandlers['participant.joined']({
  //         roomUrl: 'https://meeting.url',
  //         timeoutDuration: 5000,
  //       })
  //     })

  //     expect(result.current).toBe('https://meeting.url')
  //   })

  //   test('redirects and ends assistance after timeout with no roomUrl', () => {
  //     renderHook(() => useRoomUrl())

  //     act(() => {
  //       socketHandlers['participant.joined']({
  //         timeoutDuration: 5000,
  //       })
  //     })

  //     act(() => {
  //       jest.advanceTimersByTime(5000)
  //     })

  //     expect(socket.emit).toHaveBeenCalledWith('endAssistanceByUser', {
  //       participantId: 'participant456',
  //       sessionId: 'session123',
  //     })
  //     expect(mockPush).toHaveBeenCalledWith(
  //       '/session/contact?sessionId=session123&participantId=participant456'
  //     )
  //   })

  //   test('cancels timeout and updates roomUrl on assistance.started', () => {
  //     const { result } = renderHook(() => useRoomUrl())

  //     act(() => {
  //       socketHandlers['participant.joined']({
  //         timeoutDuration: 5000,
  //       })
  //     })

  //     act(() => {
  //       socketHandlers['assistance.started']({
  //         roomUrl: 'https://assistance.url',
  //       })
  //     })

  //     expect(result.current).toBe('https://assistance.url')
  //     act(() => {
  //       jest.advanceTimersByTime(5000)
  //     })

  //     expect(socket.emit).not.toHaveBeenCalledWith(
  //       'endAssistanceByUser',
  //       expect.anything()
  //     )
  //   })

  //   test('cleans up listeners and timeout on unmount', () => {
  //     const { unmount } = renderHook(() => useRoomUrl())

  //     act(() => {
  //       socketHandlers['participant.joined']({
  //         timeoutDuration: 5000,
  //       })
  //     })

  //     unmount()

  //     expect(socket.off).toHaveBeenCalledWith('participant.joined')
  //     expect(socket.off).toHaveBeenCalledWith('assistance.started')

  //     act(() => {
  //       jest.advanceTimersByTime(5000)
  //     })

  //     expect(socket.emit).not.toHaveBeenCalledWith(
  //       'endAssistanceByUser',
  //       expect.anything()
  //     )
  //   })
})

