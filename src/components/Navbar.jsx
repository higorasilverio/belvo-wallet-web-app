import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const NavigationHeader = styled.nav`
  display: flex;
  height: 4vh;
  justify-content: center;
  padding: 2vh 1rem;
  /* from https://uigradients.com/#Hydrogen */
  background: #667db6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #667db6,
    #0082c8,
    #0082c8,
    #667db6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #667db6,
    #0082c8,
    #0082c8,
    #667db6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const NavLinks = styled(Link)`
  padding: 4px 8px;
  margin: 0 10px;
  height: 22px;
  text-transform: uppercase;
  width: 100px;
  background-color: #0082c8;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 15px;
  border: 2px solid #fff;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 2px 2px rgba(180, 180, 180, 0.85);
    background-color: #0082c8;
  }

  &:last-child {
    position: fixed;
    right: 25px;
  }

  @media screen and (max-width: 1024px) {
    font-size: 0.75rem;
    padding: 2px 4px;
    width: 70px;

    &:last-child {
      position: relative;
      right: 0;
    }
  }
`

const Navbar = () => {
  const { pathname } = useLocation()

  const logout = useCallback(() => {
    localStorage.removeItem('token')
  }, [])

  return (
    <>
      {pathname !== '/' && (
        <NavigationHeader>
          <NavLinks to="/wallet">wallet</NavLinks>
          <NavLinks to="/transfer">transfer</NavLinks>
          <NavLinks to="/" onClick={() => logout()}>
            logout
          </NavLinks>
        </NavigationHeader>
      )}
    </>
  )
}

export default Navbar
