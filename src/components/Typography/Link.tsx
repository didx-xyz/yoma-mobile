import React from 'react'

import { Colors } from '../../styles'
import { WithChildren } from '../../types/react.types'
import Text from './Text'
import { FontWeights } from './Text.types'

type Props = WithChildren<Omit<React.ComponentProps<typeof Text>, 'color'>> & {
  color?: Colors
  onPress: () => void
}

const Link = ({ onPress, children, color = Colors.PrimaryGreen, ...props }: Props) => {
  return (
    <Text
      maxFontSizeMultiplier={undefined}
      minimumFontScale={undefined}
      weight={FontWeights.Bold700}
      color={color}
      onPress={onPress}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Link
