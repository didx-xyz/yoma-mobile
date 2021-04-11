import React, { useEffect, useState } from 'react'
import { TextStyle } from 'react-native'

import { GetComponentProps } from '../../../types/react.types'
import Text from '../Text'
import { HeaderLevels } from './Header.types'

type Props = GetComponentProps<typeof Text> & {
  level: HeaderLevels
}
const Header = ({ level, children, ...props }: Props) => {
  const [presetStyle, setPresetStyle] = useState<TextStyle>({})
  useEffect(() => {
    setPresetStyle({})
  }, [])
  return (
    <Text presetStyle={presetStyle} {...props}>
      {children}
    </Text>
  )
}

export default Header
