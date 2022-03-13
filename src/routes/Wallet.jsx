import axios from 'axios'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useWindowDimensions } from '../hooks/useWindowDimensions'

const Main = styled.main`
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

const Container = styled.div`
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

const SummaryText = styled.span`
  padding-top: 1rem;
  font-size: 3rem;
  text-transform: uppercase;
  color: #0082c8;

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
`

const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const DataText = styled.span`
  font-size: 2rem;
  text-transform: uppercase;
  color: #0082c8;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`

const InfoText = styled.span`
  font-size: 2.5rem;
  text-transform: uppercase;
  color: #fff;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`

const CodeText = styled.code`
  font-size: 1rem;
  text-transform: uppercase;
  color: #fff;

  display: block;
  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
  }
`

const DataViewBoard = styled.div`
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

const Wallet = () => {
  const [balance, setBalance] = useState({})
  const [transactions, setTransactions] = useState([])
  const [balanceJsx, setBalanceJsx] = useState(<></>)
  const [transactionsJsx, setTransactionsJsx] = useState(<></>)

  const navigate = useNavigate()

  const { width } = useWindowDimensions()

  useEffect(() => {
    const getWallet = () => {
      const config = {
        headers: { Authorization: localStorage.getItem('token') }
      }
      axios
        .get('https://belvo-wallet-challenge-api.herokuapp.com/wallet', config)
        .then(response => {
          setBalance(response.data.balance)
          setTransactions(response.data.transactions)
        })
        .catch(() => {
          localStorage.removeItem('token')
          navigate('/', { replace: true })
        })
    }

    getWallet()
  }, [navigate])

  useEffect(() => {
    const formatTransactions = () => {
      if (!isEmpty(transactions)) {
        const firstFiveItems = transactions.reverse().slice(0, 5)
        if (width > 1024) {
          const mappedTransactions = firstFiveItems.map((transaction, index) => (
            <div key={index}>
              <CodeText>{`${transaction?.description || 'no description'} - ${transaction.amount} ${
                transaction.currency
              } (${transaction.status})`}</CodeText>
              <CodeText>{`from: ${transaction.sender} - to: ${transaction.receiver},`}</CodeText>
              {index !== 4 && <hr />}
            </div>
          ))
          return mappedTransactions
        } else {
          const mappedTransactions = firstFiveItems.map((transaction, index) => (
            <div key={index}>
              <CodeText>
                {transaction?.description || 'no description'} ({transaction.amount}{' '}
                {transaction.currency})
              </CodeText>
              <CodeText>{`from: ${transaction.sender}, to: ${transaction.receiver} `}</CodeText>
              {index !== 4 && <hr />}
            </div>
          ))
          return mappedTransactions
        }
      } else return <InfoText>No transactions record!</InfoText>
    }

    const transactionsJsxFormated = formatTransactions()
    setTransactionsJsx(transactionsJsxFormated)
  }, [transactions, width])

  useEffect(() => {
    const formatMoney = value => value.toFixed(2)

    const formatBalance = () => {
      if (!isEmpty(balance)) {
        return (
          <>
            <InfoText>btc: {formatMoney(balance?.BTC)}</InfoText>
            <InfoText>doge: {formatMoney(balance?.DOGE)}</InfoText>
            <InfoText>eth: {formatMoney(balance?.ETH)}</InfoText>
          </>
        )
      } else return <InfoText>Loading balance!</InfoText>
    }

    const balanceJsxFormated = formatBalance()
    setBalanceJsx(balanceJsxFormated)
  }, [balance])

  return (
    <Main>
      <Container>
        <SummaryText>wallet summary</SummaryText>
        <BalanceContainer>
          <DataText>current balance</DataText>
          <DataViewBoard>{balanceJsx}</DataViewBoard>
        </BalanceContainer>
        <TransactionContainer>
          <DataText>last transactions</DataText>
          <DataViewBoard direction="column">{transactionsJsx}</DataViewBoard>
        </TransactionContainer>
      </Container>
    </Main>
  )
}

export default Wallet
