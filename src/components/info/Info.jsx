import { isEmpty } from 'lodash'
import { useCallback } from 'react'
import * as S from './styles'

const Info = ({ header, message, data, color }) => {
  const textToShow = useCallback(() => {
    if (!isEmpty(data)) {
      const itemIndicator = color ? '' : '-'
      const jsxMessage = data.map((item, index) => (
        <S.Code key={index}>
          {' '}
          {itemIndicator} {item.msg}
        </S.Code>
      ))
      return jsxMessage
    }
  }, [color, data])

  return (
    <S.InfoBody>
      {header && <S.SpanHeader>{header}</S.SpanHeader>}
      <S.CodeDiv style={{ backgroundColor: color || '#f00' }}>
        {message && <S.Code>{message}</S.Code>}
        {textToShow()}
      </S.CodeDiv>
    </S.InfoBody>
  )
}

export default Info
