'use client'

import { z } from 'zod'
import { useContactForm, formSchema } from '@/hooks/useContactForm'
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
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PhoneInput } from '@/components/ui/phone-input'
import { socket } from '@/socket'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function ContactPage() {
  const form = useContactForm()
  const searchParams = useSearchParams()
  const router = useRouter()

  function onSubmit(values: z.infer<typeof formSchema>) {
    socket.emit('updateInfoUser', {
      sessionId: searchParams.get('sessionId'),
      participantId: searchParams.get('participantId'),
      phone: values.phone,
    })
    router.push('/thank-you')
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>No Advisors Available</CardTitle>
          <CardDescription>
            Currently, no advisors are available. Please fill out the form
            below, and we will contact you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        id='phone'
                        placeholder='Enter your phone number'
                        defaultCountry='FR'
                        international
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full' type='submit'>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
export default function ContactPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPage />
    </Suspense>
  )
}

