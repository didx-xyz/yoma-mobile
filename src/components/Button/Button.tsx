import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import { HStack } from '~/components/Stack'
import { Colors, colors } from '~/styles'
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
  loadingLabel?: string
  isDisabled?: boolean
  isLoading?: boolean
  isLoadingEnabled?: boolean
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
  isLoadingEnabled = false,
  isFullWidth = true,
  loadingLabel = ' Loading...',
  color,
  labelStyle,
  style,
  children,
}: Props) => {
  const [buttonStyle, setButtonStyle] = useState<ViewStyle>(styles[ButtonVariants.Primary])
  const [labelColor, setLabelColor] = useState<Colors>(Colors.White)
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false)

  const handlePress = useCallback(() => {
    if (isLoadingEnabled) {
      setButtonLoading(true)
    }
    onPress?.()
  }, [isLoadingEnabled, onPress])

  useEffect(() => {
    if (isLoadingEnabled) {
      setButtonLoading(isLoading)
    }
  }, [isLoadingEnabled, isLoading])

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
      <HStack>
        {isButtonLoading && <ActivityIndicator color={colors[Colors.White]} style={{ paddingRight: 10 }} />}
        {children}
        <Text.Body align={TextAlign.Center} weight={FontWeights.Bold700} color={labelColor} style={labelStyle}>
          {isButtonLoading ? loadingLabel : label}
        </Text.Body>
      </HStack>
    </TouchableOpacity>
  )
}

export default Button
