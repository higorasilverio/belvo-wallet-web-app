import { render } from '@testing-library/react'
import Main from '../Main'

describe('Main component should work properly ', () => {
  it('when it is called', () => {
    const { getByText } = render(
      <Main>
        <h1>Test</h1>
      </Main>
    )
    expect(getByText('Test')).toBeInTheDocument()
  })
})
