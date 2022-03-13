import styled from 'styled-components'

export const Main = styled.main`
  width: 100%;
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const Container = styled.form`
  width: 750px;
  height: 50vh;
  background-color: #fff;
  border-radius: 15px;
  display: grid;
  grid-template-rows: 10vh 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  align-items: center;
  justify-items: center;
  position: fixed;
  top: 15vh;

  @media screen and (max-width: 1024px) {
    width: 90vw;
    height: 60vh;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SummaryText = styled.span`
  padding-top: 1rem;
  font-size: 3rem;
  text-transform: uppercase;
  color: #0082c8;
`

export const InputField = styled.input`
  padding: 4px 8px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid #667db690;
`

export const DataText = styled.label`
  font-size: 1rem;
  text-transform: uppercase;
  color: #0082c8;
`

export const SendButton = styled.input`
  padding: 4px 8px;
  width: 100px;

  padding: 4px 8px;
  text-transform: uppercase;

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

  &:disabled {
    background-color: #cccc;

    &:hover {
      box-shadow: none;
      background-color: #c8c8c8cc;
    }
  }
`
