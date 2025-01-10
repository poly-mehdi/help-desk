'use client'

import { z } from 'zod'
import { useHomeForm, formSchema } from '@/hooks/useHomeForm'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { socket } from '@/socket'
import { useRouter } from 'next/navigation'
import { useSocketContext } from './providers/socket-provider'
import { Suspense, useEffect } from 'react'
import useSessionFromUrl from '@/hooks/useSessionFromUrl'

function HomePage() {
  const { isConnected, transport } = useSocketContext()

  useSessionFromUrl()
  const form = useHomeForm()
  const router = useRouter()

  useEffect(() => {
    return () => {
      socket.off('createSession')
    }
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    socket.once(
      'createSession',
      (data: { sessionId: string; participantId: string }) => {
        router.push(
          `/session/${data.sessionId}?participantId=${data.participantId}`
        )
      }
    )
    socket.emit('createSession', {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    })
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-center text-4xl'>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='firstName'>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id='firstName'
                        placeholder='Enter your first name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id='lastName'
                        placeholder='Enter your last name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id='email'
                        placeholder='Enter your email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full mt-4' type='submit'>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-center'>
          <p>
            {isConnected ? 'Connected' : 'Disconnected'} via {transport}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
export default function HomePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  )
}
