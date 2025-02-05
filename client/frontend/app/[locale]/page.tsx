'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema, useHomeForm } from '@/hooks/useHomeForm';
import { z } from 'zod';

import useSessionFromUrl from '@/hooks/useSessionFromUrl';
import { socket } from '@/socket';
import { useRouter } from '@/i18n/routing';
import { Suspense, useEffect, useState } from 'react';
import { formAction } from '@/action';
import { getCaptchaToken } from '@/utils/captcha';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

function HomePage() {
  const t = useTranslations();
  const [isSessionCreated, setIsSessionCreated] = useState(false);
  const { firstName, lastName, email, appName } = useSessionFromUrl();
  const form = useHomeForm();
  const router = useRouter();

  useEffect(() => {
    if (firstName && lastName && email && appName) {
      form.reset({
        firstName,
        lastName,
        email,
      });
    }
  }, [firstName, lastName, email, form, appName]);

  useEffect(() => {
    return () => {
      socket.off('createSession');
    };
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSessionCreated(true);
    const token = await getCaptchaToken();
    const res = await formAction(token, values);
    console.log({ token });
    if (res.success) {
      socket.once(
        'createSession',
        (data: { sessionId: string; participantId: string }) => {
          router.push(
            `/session/${data.sessionId}?participantId=${data.participantId}`
          );
        }
      );
      socket.emit('createSession', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        appName: appName,
      });
      toast.success('Session created successfully');
    } else {
      toast.error(res.message);
    }
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
                    <FormLabel htmlFor='firstName'>
                      {t('welcome-page.first-name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id='firstName'
                        placeholder={t('welcome-page.first-name-placeholder')}
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
                    <FormLabel htmlFor='lastName'>
                      {t('welcome-page.last-name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id='lastName'
                        placeholder={t('welcome-page.last-name-placeholder')}
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
                    <FormLabel htmlFor='email'>
                      {t('welcome-page.email')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id='email'
                        placeholder={t('welcome-page.email-placeholder')}
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
                  {t('welcome-page.submit')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='w-full'>
          <p className='text-gray-500 text-sm text-justify'>
            {t.rich('welcome-page.captcha', {
              privacyPolicy: (chunks) => (
                <a
                  target='_blank'
                  className='text-accent-foreground'
                  href='https://policies.google.com/privacy'
                >
                  {chunks}
                </a>
              ),
              termsOfService: (chunks) => (
                <a
                  target='_blank'
                  className='text-accent-foreground'
                  href='https://policies.google.com/terms'
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
export default function HomePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}

