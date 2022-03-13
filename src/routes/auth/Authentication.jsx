import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Info, Main } from '../../components'
import { AppService } from '../../service/service'
import * as S from './styles'

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

  const login = useCallback(async () => {
    try {
      const service = new AppService()
      const { access_token } = await service.authenticate(password, username)
      localStorage.setItem('token', `bearer ${access_token}`)
      navigate('/wallet', { replace: true })
    } catch (error) {
      setErrorDetails(error.response.data.detail)
    }
  }, [navigate, password, username])

  return (
    <Main>
      {errorDetails && <Info header={'Login error!'} message={errorDetails} />}
      <S.AuthWrapper>
        <S.InputLabelWrapper htmlFor="username">
          <S.InputTitle>username</S.InputTitle>
          <S.InputField
            type="text"
            name="username"
            id="username"
            onChange={e => fieldUpdate(e, 'username')}
          />
        </S.InputLabelWrapper>
        <S.InputLabelWrapper htmlFor="password">
          <S.InputTitle>password</S.InputTitle>
          <S.InputField
            type="password"
            name="password"
            id="password"
            onChange={e => fieldUpdate(e, 'password')}
          />
        </S.InputLabelWrapper>
        <S.LoginButton type="button" value="login" onClick={() => login()} />
      </S.AuthWrapper>
    </Main>
  )
}

export default Authentication
