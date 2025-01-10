import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from './page'
import { MockSocketProvider } from './providers/socket-provider.mock'
import { useSearchParams } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}))

describe('HomePage', () => {
  test('renders the form with all fields and the submit button', () => {
    render(
      <MockSocketProvider>
        <HomePage />
      </MockSocketProvider>
    )
    // Check for title
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()

    // Check for form fields using IDs
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()

    // Check for submit button
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('allows user to fill out the form', () => {
    render(
      <MockSocketProvider>
        <HomePage />
      </MockSocketProvider>
    )

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john.doe@example.com' },
    })

    // Assert that the fields have the correct values
    expect(screen.getByLabelText('First Name')).toHaveValue('John')
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe')
    expect(screen.getByLabelText('Email')).toHaveValue('john.doe@example.com')
  })
})
