import { render } from '@testing-library/react'
import Info from '../Info'

describe('Info component should work properly ', () => {
  it('when it is called with a login error', () => {
    const errorMessage = 'Error Test'
    const { getByText, getByTestId } = render(
      <Info header={'Login error!'} message={errorMessage} />
    )

    expect(getByText('Login error!')).toBeInTheDocument()
    expect(getByText('Error Test')).toBeInTheDocument()
    expect(getByTestId('colorDiv')).toHaveStyle('backgroundColor: #f00')
  })

  it('when it is called as a transfer success indicator', () => {
    const infoArray = [{ msg: 'Success message' }]
    const color = '#42ba96'
    const { getByText, getByTestId, queryByTestId } = render(
      <Info data={infoArray} color={color} />
    )

    expect(getByText('Success message')).toBeInTheDocument()
    expect(queryByTestId('headerSpan')).toBeNull()
    expect(getByTestId('colorDiv')).toHaveStyle('backgroundColor: #42ba96')
  })
})
