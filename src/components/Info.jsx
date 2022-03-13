import { isEmpty } from "lodash";
import { useCallback } from "react";
import styled from "styled-components";

const InfoBody = styled.div`
  width: 320px;
  height: fit-content;
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
  margin: 5px;
`;

const Code = styled.code`
  font-size: 0.95rem;
  display: block;
`;

const Info = ({ header, message, data, color }) => {
  const textToShow = useCallback(() => {
    if (!isEmpty(data)) {
      const itemIndicator = color ? "" : "-";
      const jsxMessage = data.map((item, index) => (
        <Code key={index}>
          {" "}
          {itemIndicator} {item.msg}
        </Code>
      ));
      return jsxMessage;
    }
  }, [color, data]);

  return (
    <InfoBody>
      {header && <SpanHeader>{header}</SpanHeader>}
      <CodeDiv style={{ backgroundColor: color || "#f00" }}>
        {message && <Code>{message}</Code>}
        {textToShow()}
      </CodeDiv>
    </InfoBody>
  );
};

export default Info;
