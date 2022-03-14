import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '../Navbar'
import { renderWithRouter } from './util'

describe('Navbar component should work properly ', () => {
  it('when it is called at auth page, hidden all of its links', () => {
    const { queryByTestId } = renderWithRouter(<Navbar />)

    expect(queryByTestId('walletLink')).toBeNull()
    expect(queryByTestId('transferLink')).toBeNull()
    expect(queryByTestId('homeLink')).toBeNull()
  })

  it('when it is called in page that is different from auth, showing its links', () => {
    renderWithRouter(<Navbar />, { route: '/wallet' })

    expect(screen.getByText(/wallet/i)).toBeInTheDocument()
    expect(screen.getByText(/transfer/i)).toBeInTheDocument()
    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })

  it('when it is called with its links and then it is used to redirected to auth page', () => {
    const { queryByTestId } = renderWithRouter(<Navbar />, { route: '/wallet' })

    expect(screen.getByText(/wallet/i)).toBeInTheDocument()

    const leftClick = { button: 0 }
    userEvent.click(screen.getByText(/logout/i), leftClick)

    expect(queryByTestId('walletLink')).toBeNull()
  })
})
