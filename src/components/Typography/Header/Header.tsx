import React, { useMemo } from 'react'

import { WithChildren } from '~/types/react.types'

import Text from '../Text'
import styles from './Header.styles'
import { HeaderLevels } from './Header.types'

type Props = WithChildren<
  React.ComponentProps<typeof Text> & {
    level: HeaderLevels
  }
>
const Header = ({ level, children, ...props }: Props) => {
  const presetStyle = useMemo(() => styles[level], [level])
  return (
    <Text maxFontSizeMultiplier={1} presetStyle={presetStyle} {...props}>
      {children}
    </Text>
  )
}

export default Header
