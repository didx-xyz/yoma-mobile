import React, { useEffect, useState } from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import { Colors } from '../../styles'
import Text, { Bold } from '../Typography'
import styles from './Button.styles'
import { ButtonTypes } from './Button.types'

interface Props {
  label: string
  onPress: () => void
  variant?: ButtonTypes
  isDisabled?: boolean
  isFullWidth?: boolean
  labelColor?: Colors
  labelStyle?: TextStyle
  style?: ViewStyle
}
const Button = ({
  onPress,
  label,
  variant = ButtonTypes.Primary,
  isDisabled = false,
  isFullWidth = false,
  labelColor = Colors.white,
  labelStyle,
  style,
}: Props) => {
  const [buttonStyle, setButtonStyle] = useState<ViewStyle>(styles[ButtonTypes.Primary])
  const [textColor, setTextColor] = useState<Colors>(Colors.white)

  useEffect(() => {
    const variantStyle = styles[variant]
    const fullWidthStyle = isFullWidth ? styles.fullWidth : {}
    const flattenedStyles = StyleSheet.flatten([variantStyle, fullWidthStyle, style])
    setButtonStyle(flattenedStyles)
  }, [isFullWidth, variant, style])

  useEffect(() => {
    const labelVariantColor = variant === ButtonTypes.Primary ? Colors.white : Colors.primaryGreen
    setTextColor(labelColor || labelVariantColor)
  }, [variant, labelColor])

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} style={buttonStyle}>
      <Text.Body color={textColor} style={labelStyle}>
        <Bold>{label}</Bold>
      </Text.Body>
    </TouchableOpacity>
  )
}

export default Button
