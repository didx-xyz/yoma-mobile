import { mergeAll } from 'ramda'
import React, { useEffect, useState } from 'react'
import { Text as RNText, TextProps, TextStyle } from 'react-native'

import { WithChildren } from '../../types/react.types'
import styles from './Text.styles'

type Props = TextProps &
  WithChildren<{
    presetStyle?: TextStyle
    style: TextStyle
  }>

const Text = ({ presetStyle = {}, style, children, ...props }: Props) => {
  const [textStyles, setTextStyles] = useState<TextStyle>(styles.base)

  useEffect(() => {
    setTextStyles(mergeAll([styles.base, presetStyle, style]))
  }, [presetStyle, style])

  return (
    <RNText maxFontSizeMultiplier={1.3} minimumFontScale={0.8} style={textStyles} {...props}>
      {children}
    </RNText>
  )
}

export default Text
