import React, { useEffect, useState } from 'react'
import { TextStyle } from 'react-native'

import { GetComponentProps, WithChildren } from '../../../types/react.types'
import Text from '../Text'
import styles from './Header.styles'
import { HeaderLevels } from './Header.types'

type Props = WithChildren<
  GetComponentProps<typeof Text> & {
    level: HeaderLevels
  }
>
const Header = ({ level, children, ...props }: Props) => {
  const [presetStyle, setPresetStyle] = useState<TextStyle>({})
  useEffect(() => {
    setPresetStyle(styles[level])
  }, [level])
  return (
    <Text maxFontSizeMultiplier={1} presetStyle={presetStyle} {...props}>
      {children}
    </Text>
  )
}

export default Header
