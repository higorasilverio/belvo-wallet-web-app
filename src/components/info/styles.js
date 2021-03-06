import styled from 'styled-components'

export const InfoBody = styled.div`
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

  @media screen and (max-width: 1024px) {
    bottom: 5vh;
    width: 270px;
  }
`

export const SpanHeader = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
`

export const CodeDiv = styled.div`
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
`

export const Code = styled.code`
  font-size: 0.95rem;
  display: block;
`
