import { useCallback, useEffect, useState } from 'react'

export const useWindowDimensions = () => {
  const getWindowDimensions = useCallback(() => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  }, [])

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getWindowDimensions])

  return windowDimensions
}
