import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { AppService } from '../../service/service'
import * as S from './styles'

const Wallet = () => {
  const [balance, setBalance] = useState({})
  const [transactions, setTransactions] = useState([])
  const [balanceJsx, setBalanceJsx] = useState(<></>)
  const [transactionsJsx, setTransactionsJsx] = useState(<></>)

  const navigate = useNavigate()

  const { width } = useWindowDimensions()

  useEffect(() => {
    const getWallet = async () => {
      try {
        const service = new AppService()
        const { balance, transactions } = await service.wallet()
        setBalance(balance)
        setTransactions(transactions)
      } catch (error) {
        localStorage.removeItem('token')
        navigate('/', { replace: true })
      }
    }

    getWallet()
  }, [navigate])

  useEffect(() => {
    const formatTransactions = () => {
      if (!isEmpty(transactions) && width > 1024) {
        const firstFiveItems = transactions.reverse().slice(0, 5)
        const mappedTransactions = firstFiveItems.map((transaction, index) => (
          <div key={index}>
            <S.CodeText>{`${transaction?.description || 'no description'} - ${transaction.amount} ${
              transaction.currency
            } (${transaction.status})`}</S.CodeText>
            <S.CodeText>{`from: ${transaction.sender} - to: ${transaction.receiver},`}</S.CodeText>
            {index !== 4 && <hr />}
          </div>
        ))
        return mappedTransactions
      }
      if (!isEmpty(transactions) && width <= 1024) {
        const firstFiveItems = transactions.reverse().slice(0, 5)
        const mappedTransactions = firstFiveItems.map((transaction, index) => (
          <div key={index}>
            <S.CodeText>
              {transaction?.description || 'no description'} ({transaction.amount}{' '}
              {transaction.currency})
            </S.CodeText>
            <S.CodeText>{`from: ${transaction.sender}`}</S.CodeText>
            <S.CodeText>{`to: ${transaction.receiver}`}</S.CodeText>
            {index !== 4 && <hr />}
          </div>
        ))
        return mappedTransactions
      }
      return <S.InfoText>No transactions record!</S.InfoText>
    }

    setTransactionsJsx(formatTransactions())
  }, [transactions, width])

  useEffect(() => {
    const formatMoney = value => value.toFixed(2)

    const formatBalance = () => {
      if (!isEmpty(balance)) {
        return (
          <>
            <S.InfoText>btc: {formatMoney(balance?.BTC)}</S.InfoText>
            <S.InfoText>doge: {formatMoney(balance?.DOGE)}</S.InfoText>
            <S.InfoText>eth: {formatMoney(balance?.ETH)}</S.InfoText>
          </>
        )
      } else return <S.InfoText>Loading balance!</S.InfoText>
    }

    const balanceJsxFormated = formatBalance()
    setBalanceJsx(balanceJsxFormated)
  }, [balance])

  return (
    <S.Main>
      <S.Container>
        <S.SummaryText>wallet summary</S.SummaryText>
        <S.BalanceContainer>
          <S.DataText>current balance</S.DataText>
          <S.DataViewBoard>{balanceJsx}</S.DataViewBoard>
        </S.BalanceContainer>
        <S.TransactionContainer>
          <S.DataText>last transactions</S.DataText>
          <S.DataViewBoard direction="column">{transactionsJsx}</S.DataViewBoard>
        </S.TransactionContainer>
      </S.Container>
    </S.Main>
  )
}

export default Wallet
