import styled from "styled-components";

const InfoBody = styled.div`
  width: 320px;
  height: 120px;
  position: fixed;
  bottom: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid #667db6;
  border-radius: 15px;
  background-color: #fff;
  color: #f00;
  font-weight: bold;
  letter-spacing: 1px;
`;

const SpanHeader = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
`;

const CodeDiv = styled.div`
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  background-color: #f00;
`;

const Code = styled.code`
  font-size: 0.95rem;
`;

const Info = ({ message }) => {
  return (
    <InfoBody>
      <SpanHeader>Login error!</SpanHeader>
      <CodeDiv>
        <Code>{message}</Code>
      </CodeDiv>
    </InfoBody>
  );
};

export default Info;
