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
  FormDescription,
} from '@/components/ui/form';
import { useParams, useRouter } from 'next/navigation';
import {
  useSessionEvaluationForm,
  formSchema,
} from '@/hooks/use-session-evaluation-form';
import { z } from 'zod';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { socket } from '@/socket';
import { Textarea } from '@/components/ui/textarea';

function SessionEvaluation() {
  const [isAssistanceEnded, setIsAssistanceEnded] = useState(false);
  const { id: sessionId } = useParams();
  const form = useSessionEvaluationForm();
  const router = useRouter();

  useBreadcrumbs([
    { label: 'Session', link: '/apps/sessions' },
    {
      label: 'Evaluation',
      link: `/apps/sessions/session-evaluation/${sessionId}`,
    },
  ]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAssistanceEnded(true);
    socket.emit('endAssistance', {
      sessionId: sessionId,
      isResolved: values.isResolved,
      issueType: values.issueType,
      description: values.description,
    });
    router.push('/apps');
  }

  return (
    <div className='page flex items-center justify-center min-h-[calc(100vh-4rem)]'>
      <Card className='bg-primary-foreground '>
        <CardHeader>
          <CardTitle>Rate Your Session</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='isResolved'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between'>
                    <FormLabel htmlFor='isResolved'>
                      Is the issue resolved?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={field.name}
                        id={field.name}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='issueType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select an issue type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='general-inquiry'>
                          General Inquiry
                        </SelectItem>
                        <SelectItem value='technical-issue'>
                          Technical Issue
                        </SelectItem>
                        <SelectItem value='account-issue'>
                          Account Issue
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage issue types in your account settings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='description'>
                      Describe your issue
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id='description'
                        placeholder='Describe your issue'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className='w-full'
                type='submit'
                disabled={isAssistanceEnded}
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
export default SessionEvaluation;

