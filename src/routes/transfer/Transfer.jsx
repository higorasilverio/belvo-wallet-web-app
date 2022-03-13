import axios from 'axios'
import { isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Info } from '../../components'
import * as S from './styles'

const Transfer = () => {
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [currency, setCurrency] = useState('')
  const [receiver, setReceiver] = useState('')
  const [receiversList, setReceiversList] = useState([])
  const [infoArray, setInfoArray] = useState([])
  const [color, setColor] = useState(null)
  const [disableButton, setDisableButton] = useState(true)

  const navigate = useNavigate()

  const currencyOptions = [
    { value: 'BTC', label: 'BTC' },
    { value: 'DOGE', label: 'DOGE' },
    { value: 'ETH', label: 'ETH' }
  ]

  useEffect(() => {
    const getContacts = () => {
      const config = {
        headers: { Authorization: localStorage.getItem('token') }
      }
      axios
        .get('https://belvo-wallet-challenge-api.herokuapp.com/contacts', config)
        .then(response => {
          let options = []
          response.data.map(_receiver => {
            return options.push({
              value: _receiver.email,
              label: _receiver.name
            })
          })

          setReceiversList(options)
        })
        .catch(() => {
          localStorage.removeItem('token')
          navigate('/', { replace: true })
        })
    }

    getContacts()
  }, [navigate])

  const postTransfer = useCallback(() => {
    setColor('#42ba96')
    const config = {
      headers: { Authorization: localStorage.getItem('token') }
    }
    const payload = {
      description,
      amount: value,
      currency,
      receiver
    }

    axios
      .post('https://belvo-wallet-challenge-api.herokuapp.com/wallet/send', payload, config)
      .then(response => {
        setInfoArray([
          {
            msg: `Transference ${response.data.status} to ${response.data.receiver}`
          }
        ])
      })
      .catch(error => {
        if (error.response.status === 422) {
          setColor(null)
          setInfoArray(error.response.data.detail)
          return
        }
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          navigate('/', { replace: true })
        }
      })
  }, [currency, description, navigate, receiver, setInfoArray, value])

  useEffect(() => {
    setDisableButton(
      isEmpty(description) || isEmpty(value) || isEmpty(currency) || isEmpty(receiver)
    )
  }, [description, value, currency, receiver])

  const fieldUpdate = useCallback((e, type) => {
    setInfoArray([])
    switch (type) {
      case 'description':
        setDescription(e.currentTarget.value)
        break
      case 'value':
        setValue(e.currentTarget.value)
        break
      case 'currency':
        setCurrency(e.value)
        break
      case 'receiver':
        setReceiver(e.value)
        break
      default:
        break
    }
  }, [])

  return (
    <S.Main>
      {!isEmpty(infoArray) && <Info data={infoArray} color={color} />}
      <S.Container>
        <S.SummaryText>transfer</S.SummaryText>
        <S.Wrapper>
          <S.DataText htmlFor="description">enter transaction description</S.DataText>
          <S.InputField
            type="text"
            name="description"
            id="description"
            onChange={e => fieldUpdate(e, 'description')}
          />
        </S.Wrapper>
        <S.Wrapper>
          <S.DataText htmlFor="value">enter transaction value</S.DataText>
          <S.InputField
            type="text"
            name="value"
            id="value"
            onChange={e => fieldUpdate(e, 'value')}
          />
        </S.Wrapper>
        <S.Wrapper>
          <S.DataText htmlFor="currency">select currency</S.DataText>
          <Select
            defaultValue={currency}
            onChange={e => fieldUpdate(e, 'currency')}
            options={currencyOptions}
          />
        </S.Wrapper>
        <S.Wrapper>
          <S.DataText htmlFor="receiver">select receiver</S.DataText>
          {!isEmpty(receiversList) && (
            <Select
              defaultValue={receiver}
              onChange={e => fieldUpdate(e, 'receiver')}
              options={receiversList}
            />
          )}
        </S.Wrapper>
        <S.SendButton
          disabled={disableButton}
          type="button"
          value="send"
          onClick={() => postTransfer()}
        />
      </S.Container>
    </S.Main>
  )
}

export default Transfer
