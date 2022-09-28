import { isNil } from 'ramda'
import React from 'react'

import Optional from '~/components/Optional'
import Text, { TextAlign } from '~/components/Typography'
import { Colors } from '~/styles'

interface Props {
  error?: string
  touched?: boolean
}
const InputError = ({ error, touched }: Props) => (
  <Optional condition={!!error && (touched || isNil(touched))}>
    <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
      {error}
    </Text.Meta>
  </Optional>
)

export default InputError
