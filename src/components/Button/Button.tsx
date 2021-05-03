import React, { useEffect, useState } from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import { Colors } from '../../styles'
import { WithChildren } from '../../types/react.types'
import Text, { FontWeights, TextAlign } from '../Typography'
import { MAP_VARIANT_TO_LABEL_COLOR } from './Button.constants'
import styles from './Button.styles'
import { ButtonSizes, ButtonVariants } from './Button.types'

type Props = WithChildren<{
  label: string
  onPress: () => void
  variant?: ButtonVariants
  size?: ButtonSizes
  color?: Colors
  isDisabled?: boolean
  isFullWidth?: boolean
  labelStyle?: TextStyle
  style?: ViewStyle
}>
const Button = ({
  label,
  onPress,
  variant = ButtonVariants.Primary,
  size = ButtonSizes.Default,
  isDisabled = false,
  isFullWidth = true,
  color,
  labelStyle,
  style,
  children,
}: Props) => {
  const [buttonStyle, setButtonStyle] = useState<ViewStyle>(styles[ButtonVariants.Primary])
  const [labelColor, setLabelColor] = useState<Colors>(Colors.white)

  useEffect(() => {
    const variantStyle = styles[variant]
    const sizeStyle = styles[size]
    const fullWidthStyle = isFullWidth ? styles.fullWidth : {}
    const flattenedButtonStyles = StyleSheet.flatten([variantStyle, sizeStyle, fullWidthStyle, style])
    setButtonStyle(flattenedButtonStyles)
  }, [isFullWidth, variant, size, style])

  useEffect(() => {
    const labelVariantColor = MAP_VARIANT_TO_LABEL_COLOR[variant]
    setLabelColor(color || labelVariantColor)
  }, [variant, color])

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} style={buttonStyle}>
      {children}
      <Text.Body align={TextAlign.center} weight={FontWeights.bold_700} color={labelColor} style={labelStyle}>
        {label}
      </Text.Body>
    </TouchableOpacity>
  )
}

export default Button
