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

export const Container = styled.div`
  width: 750px;
  height: 75vh;
  background-color: #fff;
  border-radius: 15px;
  display: grid;
  grid-template-rows: 10vh 15vh 1fr;
  text-align: center;

  @media screen and (max-width: 1024px) {
    width: 90vw;
    height: 90vh;
    grid-template-rows: 12vh 15vh 1fr;
  }
`

export const SummaryText = styled.span`
  padding-top: 1rem;
  font-size: 3rem;
  text-transform: uppercase;
  color: #0082c8;

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
`

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const DataText = styled.span`
  font-size: 2rem;
  text-transform: uppercase;
  color: #0082c8;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`

export const InfoText = styled.span`
  font-size: 2.5rem;
  text-transform: uppercase;
  color: #fff;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`

export const CodeText = styled.code`
  font-size: 1rem;
  text-transform: uppercase;
  color: #fff;

  display: block;
  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
  }
`

export const DataViewBoard = styled.div`
  width: 90%;
  height: 75%;
  background-color: #667db6;
  border-radius: 15px;
  color: #fff;
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`
