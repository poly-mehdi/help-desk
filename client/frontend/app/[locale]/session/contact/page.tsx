'use client';

import { z } from 'zod';
import { useContactForm, formSchema } from '@/hooks/useContactForm';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PhoneInput } from '@/components/ui/phone-input';
import { socket } from '@/socket';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';

function ContactPage() {
  const t = useTranslations();
  const form = useContactForm();
  const searchParams = useSearchParams();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    socket.emit('updateInfoUser', {
      sessionId: searchParams.get('sessionId'),
      participantId: searchParams.get('participantId'),
      phone: values.phone,
    });
    router.push('/thank-you-callback');
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {t('contact.no-advisors-available')}
          </CardTitle>
          <CardDescription>
            {t('contact.-no-advisors-description')}
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
                    <FormLabel htmlFor='phone'>{t('contact.phone')}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        id='phone'
                        placeholder={t('contact.phone-placeholder')}
                        defaultCountry='FR'
                        international
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full' type='submit'>
                {t('contact.submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='text-sm text-muted-foreground'>
          {t('contact.form-empty')}
        </CardFooter>
      </Card>
    </div>
  );
}
export default function ContactPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPage />
    </Suspense>
  );
}

