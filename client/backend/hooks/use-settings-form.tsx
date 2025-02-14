import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/hooks';

// Validation schema
export const formSchema = z.object({
  delay: z.coerce
    .number()
    .min(0, {
      message: 'delay must be at least 10 seconds',
    })
    .max(300, {
      message: 'delay must be at most 300 seconds',
    })
    .or(z.literal('')),
});

// Hook for form logic
export const useSettingsForm = () => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      delay: '',
    },
  });
};

