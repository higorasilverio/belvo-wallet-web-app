import axios from 'axios'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Info, Main } from '../components'

const AuthWrapper = styled.form`
  width: 320px;
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid #667db6;
  border-radius: 15px;
  background-color: #fff;
`

const InputLabelWrapper = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
`

const InputTitle = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
`

const InputField = styled.input`
  padding: 4px 8px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid #667db690;
`

const LoginButton = styled.input`
  padding: 4px 8px;
  text-transform: uppercase;
  width: 45%;
  height: 30px;
  background-color: #0082c8;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 15px;
  border: 2px solid #fff;

  &:hover {
    box-shadow: 2px 2px rgba(180, 180, 180, 0.85);
    background-color: #0082c8;
  }
`

const Authentication = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorDetails, setErrorDetails] = useState('')

  const navigate = useNavigate()

  const fieldUpdate = useCallback(
    (e, type) => {
      if (errorDetails) setErrorDetails('')
      const currentValue = e.currentTarget.value
      type === 'username' ? setUsername(currentValue) : setPassword(currentValue)
    },
    [errorDetails]
  )

  const login = useCallback(() => {
    axios
      .post('https://belvo-wallet-challenge-api.herokuapp.com/login', {
        password,
        username
      })
      .then(response => localStorage.setItem('token', `bearer ${response.data.access_token}`))
      .then(() => navigate('/wallet', { replace: true }))
      .catch(error => setErrorDetails(error.response.data.detail))
  }, [navigate, password, username])

  return (
    <Main>
      {errorDetails && <Info header={'Login error!'} message={errorDetails} />}
      <AuthWrapper>
        <InputLabelWrapper htmlFor="username">
          <InputTitle>username</InputTitle>
          <InputField
            type="text"
            name="username"
            id="username"
            onChange={e => fieldUpdate(e, 'username')}
          />
        </InputLabelWrapper>
        <InputLabelWrapper htmlFor="password">
          <InputTitle>password</InputTitle>
          <InputField
            type="password"
            name="password"
            id="password"
            onChange={e => fieldUpdate(e, 'password')}
          />
        </InputLabelWrapper>
        <LoginButton type="button" value="login" onClick={() => login()} />
      </AuthWrapper>
    </Main>
  )
}

export default Authentication
