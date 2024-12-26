import { useEffect, useState } from 'react'
import { socket } from '../socket'

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)
    }

    const onDisconnect = () => {
      setIsConnected(false)
      setTransport('N/A')
    }

    const onError = (error: any) => {
      console.error('Connection error:', error)
    }

    if (socket.connected) {
      onConnect()
    } else {
      socket.connect()
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', onError)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('connect_error', onError)
    }
  }, [])

  return { isConnected, transport }
}
