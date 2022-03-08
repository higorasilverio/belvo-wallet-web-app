import styled from "styled-components";

const Mainly = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Main = ({ children }) => {
  return <Mainly>{children}</Mainly>;
};

export default Main;
