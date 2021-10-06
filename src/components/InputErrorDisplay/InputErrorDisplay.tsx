import React from 'react'

import { Colors } from '../../styles'
import Optional from '../Optional'
import Text, { TextAlign } from '../Typography'

interface Props {
  error?: string
  touched: boolean
}
const InputErrorDisplay = ({ error, touched }: Props) => (
  <Optional condition={!!error && touched}>
    <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
      {error}
    </Text.Meta>
  </Optional>
)

export default InputErrorDisplay
