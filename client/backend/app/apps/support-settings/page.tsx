'use client';

import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSettingsForm } from '@/hooks/use-settings-form';
import { useSettings } from '@/hooks/use-settings';
import { socket } from '@/socket';
import { updateSetting } from '@/features/settings/settingsSlice';
import { toast } from 'sonner';

function SupportSettingsPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs([
        { label: 'Support Settings', link: 'apps/support-settings' },
      ])
    );
  }, [dispatch]);
  const delay = useAppSelector(
    (state: { settingsState: { settings: Record<string, unknown> } }) =>
      state.settingsState.settings.delay
  ) as number;

  useSettings();
  const form = useSettingsForm();

  const onSubmit = async () => {
    if (form.getValues('delay') !== '') {
      socket.emit('updateVariable', {
        name: 'delay',
        value: Number(form.getValues('delay')) * 1000,
      });
      dispatch(
        updateSetting({
          key: 'delay',
          value: Number(form.getValues('delay')) * 1000,
        })
      );
      toast.success('Settings updated');
      form.reset();
    }
  };

  return (
    <div>
      <h1 className='mb-4'>Update Settings</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='delay'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delay to start assistance (seconds)</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`${delay / 1000} seconds`}
                    type='number'
                    className='max-w-52'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the delay the support agent has to respond to a
                  customer.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Save</Button>
        </form>
      </Form>
    </div>
  );
}
export default SupportSettingsPage;

