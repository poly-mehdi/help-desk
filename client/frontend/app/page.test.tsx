import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from './page'

describe('Page', () => {
  test('renders the form with all fields and the submit button', () => {
    render(<HomePage />)
    // Check for title
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()

    // Check for form fields using IDs
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    // expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()

    // Check for submit button
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('allows user to fill out the form', () => {
    render(<HomePage />)

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John' },
    })
    // fireEvent.change(screen.getByLabelText('Last Name'), {
    //   target: { value: 'Doe' },
    // })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john.doe@example.com' },
    })

    // Assert that the fields have the correct values
    expect(screen.getByLabelText('Name')).toHaveValue('John')
    // expect(screen.getByLabelText('Last Name')).toHaveValue('Doe')
    expect(screen.getByLabelText('Email')).toHaveValue('john.doe@example.com')
  })
})
