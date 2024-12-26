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

import { useSocket } from '../hooks/useSocket'
import { socket } from '../socket'

import customFetch from '@/utils/customFetch'

function HomePage() {
  const { isConnected, transport } = useSocket()

  const form = useHomeForm()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await customFetch.post('/users', values)
      socket.emit('clientJoinedQueue', {
        username: values.username,
        lastName: values.name,
        email: values.email,
      })
    } catch (error) {
      console.error(error)
    }
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
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='userName'>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id='username'
                        placeholder='Enter your first name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='name'>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id='name'
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
export default HomePage
