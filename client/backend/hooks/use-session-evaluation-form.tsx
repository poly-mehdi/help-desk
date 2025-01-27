import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Validation schema
export const formSchema = z.object({
  isResolved: z.boolean(),
  issueType: z.string(),
})

// Hook for form logic
export const useSessionEvaluationForm = () => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isResolved: false,
      issueType: '',
    },
  })
}
