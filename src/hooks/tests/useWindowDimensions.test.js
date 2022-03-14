import { renderHook } from '@testing-library/react-hooks'
import { useWindowDimensions } from '../useWindowDimensions'

describe('Should return correct window dimensions ', () => {
  it('when it is called', () => {
    const wrapper = ({ children }) => <div>{children}</div>

    global.innerWidth = 550
    global.innerHeight = 650

    const { result } = renderHook(useWindowDimensions, { wrapper })

    expect(result.current.width).toBe(550)
    expect(result.current.height).toBe(650)
  })
})
