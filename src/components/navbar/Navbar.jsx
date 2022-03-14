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
          <S.NavLinks to="/wallet" data-testid="walletLink">
            wallet
          </S.NavLinks>
          <S.NavLinks to="/transfer" data-testid="transferLink">
            transfer
          </S.NavLinks>
          <S.NavLinks to="/" data-testid="homeLink" onClick={() => logout()}>
            logout
          </S.NavLinks>
        </S.NavigationHeader>
      )}
    </>
  )
}

export default Navbar
