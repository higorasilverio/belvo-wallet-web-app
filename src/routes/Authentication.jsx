import { Main } from "../components";
import styled from "styled-components";

const AuthWrapper = styled.div`
  width: 320px;
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid rgba(30, 30, 220, 0.25);
  border-radius: 15px;
`;

const InputLabelWrapper = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const InputTitle = styled.span`
  text-transform: uppercase;
`;

const FormField = styled.input`
  padding: 4px 8px;
`;

const LoginButton = styled.input`
  padding: 4px 8px;
  text-transform: uppercase;
`;

const Authentication = () => {
  return (
    <Main>
      <AuthWrapper>
        <InputLabelWrapper htmlFor="username">
          <InputTitle>username</InputTitle>
          <FormField type="text" name="username" id="username" />
        </InputLabelWrapper>
        <InputLabelWrapper htmlFor="password">
          <InputTitle>password</InputTitle>
          <FormField type="password" name="password" id="password" />
        </InputLabelWrapper>
        <LoginButton type="button" value="login" />
      </AuthWrapper>
    </Main>
  );
};

export default Authentication;
