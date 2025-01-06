// hooks/useHomeForm.ts
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Validation schema
export const formSchema = z.object({
  firstName: z.string().min(2, 'Name must be at least 2 characters').max(50),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50),
  email: z.string().email('Invalid email address'),
})

// Hook for form logic
export const useHomeForm = () => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })
}
