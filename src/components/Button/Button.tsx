import React, { useEffect, useState } from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import { Colors } from '../../styles'
import Text, { FontWeights, TextAlign } from '../Typography'
import styles from './Button.styles'
import { ButtonSizes, ButtonVariants } from './Button.types'

interface Props {
  label: string
  onPress: () => void
  variant?: ButtonVariants
  size?: ButtonSizes
  isDisabled?: boolean
  isFullWidth?: boolean
  labelColor?: Colors
  labelStyle?: TextStyle
  style?: ViewStyle
}
const Button = ({
  label,
  onPress,
  variant = ButtonVariants.Primary,
  size = ButtonSizes.Default,
  isDisabled = false,
  isFullWidth = true,
  labelColor = Colors.white,
  labelStyle,
  style,
}: Props) => {
  const [buttonStyle, setButtonStyle] = useState<ViewStyle>(styles[ButtonVariants.Primary])
  const [textColor, setTextColor] = useState<Colors>(Colors.white)

  useEffect(() => {
    const variantStyle = styles[variant]
    const sizeStyle = styles[size]
    const fullWidthStyle = isFullWidth ? styles.fullWidth : {}
    const flattenedStyles = StyleSheet.flatten([variantStyle, sizeStyle, fullWidthStyle, style])
    setButtonStyle(flattenedStyles)
  }, [isFullWidth, variant, size, style])

  useEffect(() => {
    const labelVariantColor = variant === ButtonVariants.Primary ? Colors.white : Colors.primaryGreen
    setTextColor(labelColor || labelVariantColor)
  }, [variant, labelColor])

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} style={buttonStyle}>
      <Text.Body align={TextAlign.center} weight={FontWeights.bold_700} color={textColor} style={labelStyle}>
        {label}
      </Text.Body>
    </TouchableOpacity>
  )
}

export default Button
