import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import * as S from './styles'

const Navbar = () => {
  const { pathname } = useLocation()

  const logout = useCallback(() => {
    localStorage.removeItem('token')
  }, [])

  return (
    <>
      {pathname !== '/' && (
        <S.NavigationHeader>
          <S.NavLinks to="/wallet">wallet</S.NavLinks>
          <S.NavLinks to="/transfer">transfer</S.NavLinks>
          <S.NavLinks to="/" onClick={() => logout()}>
            logout
          </S.NavLinks>
        </S.NavigationHeader>
      )}
    </>
  )
}

export default Navbar
