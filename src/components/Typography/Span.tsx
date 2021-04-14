import React from 'react'

import { GetComponentProps, WithChildren } from '../../types/react.types'
import Text from './Text'

type Props = WithChildren<GetComponentProps<typeof Text>>

const Span = ({ children, ...props }: Props) => {
  return (
    <Text maxFontSizeMultiplier={undefined} minimumFontScale={undefined} {...props}>
      {children}
    </Text>
  )
}

export default Span
