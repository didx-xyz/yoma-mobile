import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'
import { applyAlphaToHex } from '~/styles/styles.utils'
import { WithChildren } from '~/types/react.types'

import Text, { FontWeights, TextAlign } from '../Typography'
import { MAP_VARIANT_TO_LABEL_COLOR } from './Button.constants'
import styles from './Button.styles'
import { ButtonSizes, ButtonVariants } from './Button.types'

type Props = WithChildren<{
  label: string
  onPress?: () => void
  variant?: ButtonVariants
  size?: ButtonSizes
  color?: Colors
  isDisabled?: boolean
  isLoading?: boolean
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
  isLoading = false,
  isFullWidth = true,
  color,
  labelStyle,
  style,
  children,
}: Props) => {
  const [buttonStyle, setButtonStyle] = useState<ViewStyle>(styles[ButtonVariants.Primary])
  const [labelColor, setLabelColor] = useState<Colors>(Colors.White)
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false)

  const handlePress = useCallback(() => {
    setButtonLoading(true)
    onPress?.()
  }, [onPress])

  useEffect(() => {
    setButtonLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    const variantStyle = styles[variant]
    const sizeStyle = styles[size]
    const fullWidthStyle = isFullWidth ? styles.fullWidth : {}
    const flattenedButtonStyles = StyleSheet.flatten([variantStyle, sizeStyle, fullWidthStyle, style])
    setButtonStyle(flattenedButtonStyles)
  }, [isFullWidth, variant, size, style])

  useEffect(() => {
    const defaultVariantColor = MAP_VARIANT_TO_LABEL_COLOR[variant]
    const labelVariantColor = color || defaultVariantColor
    setLabelColor(isDisabled ? Colors.MenuGrey : labelVariantColor)
  }, [variant, color, isDisabled])

  return (
    <TouchableOpacity onPress={handlePress} disabled={isDisabled} style={buttonStyle}>
      {children}
      <Text.Body align={TextAlign.Center} weight={FontWeights.Bold700} color={labelColor} style={labelStyle}>
        {isButtonLoading ? <ActivityIndicator color={colors[Colors.White]} /> : label}
      </Text.Body>
    </TouchableOpacity>
  )
}

export default Button
