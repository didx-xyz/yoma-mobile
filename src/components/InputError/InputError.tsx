import React from 'react'

import Optional from '~/components/Optional'
import Text, { TextAlign } from '~/components/Typography'
import { Colors } from '~/styles'

interface Props {
  error?: string
}
const InputError = ({ error }: Props) => {
  console.log({ in: 'InputError', error })

  return (
    <Optional condition={!!error}>
      <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
        {error}
      </Text.Meta>
    </Optional>
  )
}

export default InputError
