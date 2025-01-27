'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formSchema, useHomeForm } from '@/hooks/useHomeForm'
import { z } from 'zod'

import useSessionFromUrl from '@/hooks/useSessionFromUrl'
import { socket } from '@/socket'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function HomePage() {
  const [isSessionCreated, setIsSessionCreated] = useState(false)

  useSessionFromUrl()
  const form = useHomeForm()
  const router = useRouter()

  useEffect(() => {
    return () => {
      socket.off('createSession')
    }
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSessionCreated(true)
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
      <Card className='w-full max-w-sm bg-primary-foreground'>
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
              <div className='pt-2'>
                <Button
                  className='w-full'
                  type='submit'
                  disabled={isSessionCreated}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
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
