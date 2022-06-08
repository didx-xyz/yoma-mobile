import React from 'react'

import { WithChildren } from '~/types/react.types'

import Text from './Text'
import { fontWeights } from './fontWeights.styles'

type Props = WithChildren<React.ComponentProps<typeof Text>>

const Bold = ({ children, ...props }: Props) => {
  return (
    <Text maxFontSizeMultiplier={undefined} minimumFontScale={undefined} presetStyle={fontWeights.bold700} {...props}>
      {children}
    </Text>
  )
}

export default Bold
