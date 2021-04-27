import React from 'react'

import { Colors } from '../../styles'
import { GetComponentProps, WithChildren } from '../../types/react.types'
import Bold from './Bold'
import Text from './Text'

type Props = WithChildren<Omit<GetComponentProps<typeof Text>, 'color'>> & {
  color?: Colors
  onPress: () => void
}

const Link = ({ onPress, children, color = Colors.primaryGreen, ...props }: Props) => {
  return (
    <Text maxFontSizeMultiplier={undefined} minimumFontScale={undefined} color={color} onPress={onPress} {...props}>
      <Bold>{children}</Bold>
    </Text>
  )
}

export default Link
