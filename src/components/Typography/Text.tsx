import React, { useMemo } from 'react'
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native'

import { Colors, colors } from '~/styles'
import { WithChildren } from '~/types/react.types'

import styles from './Text.styles'
import { FontWeights, TextAlign } from './Text.types'
import { fontWeights } from './fontWeights.styles'

type Props = TextProps &
  WithChildren<{
    color?: Colors
    presetStyle?: TextStyle
    weight?: FontWeights
    align?: TextAlign
    style?: TextStyle
  }>

const Text = ({ presetStyle, weight, align, color, style, children, ...props }: Props) => {
  const colorStyle = useMemo(() => (color ? { color: colors[color] } : {}), [color])
  const fontWeightStyle = useMemo(() => (weight ? fontWeights[weight] : {}), [weight])
  const textAlignStyle = useMemo(() => (align ? { textAlign: align } : {}), [align])
  const textStyles = useMemo(
    () => StyleSheet.flatten([styles.base, presetStyle, colorStyle, fontWeightStyle, textAlignStyle, style]),
    [colorStyle, fontWeightStyle, presetStyle, style, textAlignStyle],
  )

  return (
    <RNText maxFontSizeMultiplier={1.3} minimumFontScale={0.8} style={textStyles} {...props} testID="text">
      {children}
    </RNText>
  )
}

export default Text
