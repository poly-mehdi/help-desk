import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Validation schema
export const formSchema = z.object({
  isResolved: z.boolean(),
  issueType: z.string({
    required_error: 'Please select an issue type',
  }),
  description: z.string().optional(),
})

// Hook for form logic
export const useSessionEvaluationForm = () => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isResolved: false,
      description: '',
    },
  })
}

