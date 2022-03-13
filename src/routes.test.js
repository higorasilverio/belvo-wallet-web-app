import { render, screen } from '@testing-library/react'
import { Authentication, Transfer, Wallet } from './routes'

describe('Should render routes when ', () => {
  it('it trys to render the authentication route', () => {
    render(<Authentication />)
    const simpleText = screen.getByText(/authentication/i)
    expect(simpleText).toBeInTheDocument()
  })

  it('it trys to render the wallet route', () => {
    render(<Wallet />)
    const simpleText = screen.getByText(/wallet/i)
    expect(simpleText).toBeInTheDocument()
  })

  it('it trys to render the transfer route', () => {
    render(<Transfer />)
    const simpleText = screen.getByText(/transfer/i)
    expect(simpleText).toBeInTheDocument()
  })
})
