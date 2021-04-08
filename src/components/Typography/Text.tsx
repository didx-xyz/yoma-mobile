import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

import { WithChildren } from '../../types/react.types'

type TextProps = RNTextProps & WithChildren<{}>

const Text = ({ children, ...props }: TextProps) => {
  return <RNText {...props}>{children}</RNText>
}

export default Text
