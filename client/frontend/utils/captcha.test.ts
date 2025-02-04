import { getCaptchaToken, verifyCaptchaToken } from './captcha'

global.grecaptcha = {
  ready: (callback: () => void) => callback(),
  execute: jest.fn(() => Promise.resolve('fake-captcha-token')),
} as any

describe('Captcha Utils', () => {
  test('getCaptchaToken should return a token', async () => {
    process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY = 'fake-site-key'
    const token = await getCaptchaToken()
    expect(token).toBe('fake-captcha-token')
  })

  test('getCaptchaToken should return null if site key is missing', async () => {
    delete process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY
    const token = await getCaptchaToken()
    expect(token).toBeNull()
  })

  test('verifyCaptchaToken should return captcha data on success', async () => {
    process.env.CAPTCHA_SECRET_KEY = 'fake-secret-key'

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            challenge_ts: '2025-01-30T12:00:00Z',
            hostname: 'example.com',
            score: 0.9,
            action: 'submit',
          }),
      })
    ) as jest.Mock

    const result = await verifyCaptchaToken('fake-captcha-token')
    expect(result).toEqual({
      success: true,
      challenge_ts: '2025-01-30T12:00:00Z',
      hostname: 'example.com',
      score: 0.9,
      action: 'submit',
    })
  })

  test('verifyCaptchaToken should return null on API error', async () => {
    process.env.CAPTCHA_SECRET_KEY = 'fake-secret-key'

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            success: false,
            'error-codes': ['invalid-input-response'],
          }),
      })
    ) as jest.Mock

    const result = await verifyCaptchaToken('invalid-token')
    expect(result).toBeNull()
  })

  test('verifyCaptchaToken should throw error if secret key is missing', async () => {
    delete process.env.CAPTCHA_SECRET_KEY

    await expect(verifyCaptchaToken('fake-token')).rejects.toThrow(
      'Secret key not found'
    )
  })
})

