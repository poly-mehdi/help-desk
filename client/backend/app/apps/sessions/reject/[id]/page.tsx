'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useParams, useRouter } from 'next/navigation';
import { useRejectForm, formSchema } from '@/hooks/use-reject-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { socket } from '@/socket';
import { Textarea } from '@/components/ui/textarea';
import { Suspense } from 'react';

function RejectPage() {
  const { id: sessionId } = useParams();
  const form = useRejectForm();
  const router = useRouter();

  useBreadcrumbs([
    { label: 'Session', link: '/apps/sessions' },
    {
      label: 'Recall',
      link: `/apps/sessions/recall/${sessionId}`,
    },
  ]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    socket.emit('rejectSession', {
      sessionId: sessionId,
      rejectedReason: values.reason,
    });
    router.push('/apps');
  }
  return (
    <div className='page flex min-h-svh flex-col items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Reject a call</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='reason'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id='reason'
                        placeholder='Enter the reason for the recall'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full' type='submit'>
                Reject
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
export default function RejectPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RejectPage />
    </Suspense>
  );
}

