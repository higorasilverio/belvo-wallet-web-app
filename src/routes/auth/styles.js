import styled from 'styled-components'

export const AuthWrapper = styled.form`
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

export const InputLabelWrapper = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
`

export const InputTitle = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
`

export const InputField = styled.input`
  padding: 4px 8px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid #667db690;
`

export const LoginButton = styled.input`
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
