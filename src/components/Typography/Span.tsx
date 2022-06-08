import React from 'react'

import { WithChildren } from '~/types/react.types'

import Text from './Text'

type Props = WithChildren<React.ComponentProps<typeof Text>>

const Span = ({ children, ...props }: Props) => {
  return (
    <Text maxFontSizeMultiplier={undefined} minimumFontScale={undefined} {...props}>
      {children}
    </Text>
  )
}

export default Span
