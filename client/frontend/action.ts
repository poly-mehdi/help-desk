'use server';

import { z } from 'zod';
import { formSchema } from './hooks/useHomeForm';
import { verifyCaptchaToken } from './utils/captcha';

export async function formAction(
  token: string | null,
  values: z.infer<typeof formSchema>
) {
  if (!token) {
    return {
      success: false,
      message: 'Token not found',
    };
  }

  // Verify the token
  const captchaData = await verifyCaptchaToken(token);

  if (!captchaData) {
    return {
      success: false,
      message: 'Captcha Failed - Could not verify token',
    };
  }

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      success: false,
      message: 'Captcha Failed',
      errors: !captchaData.success ? captchaData['error-codes'] : undefined,
    };
  }

  return {
    success: true,
    message: 'Form submitted successfully',
  };
}

