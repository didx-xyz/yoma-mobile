import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import Optional from '~/components/Optional'
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

  const buttonStyle = useMemo(() => {
    const variantStyle = styles[variant]
    const sizeStyle = styles[size]
    const fullWidthStyle = isFullWidth ? styles.fullWidth : {}
    return StyleSheet.flatten([variantStyle, sizeStyle, fullWidthStyle, style])
  }, [isFullWidth, size, style, variant])

  const labelColor = useMemo(() => {
    const defaultVariantColor = MAP_VARIANT_TO_LABEL_COLOR[variant]
    const labelVariantColor = color || defaultVariantColor
    return isDisabled ? Colors.MenuGrey : labelVariantColor
  }, [color, isDisabled, variant])

  return (
    <TouchableOpacity onPress={handlePress} disabled={isDisabled} style={buttonStyle}>
      <HStack styles={styles.content}>
        <Optional condition={isButtonLoading}>
          <ActivityIndicator color={colors[Colors.White]} style={styles.loading} />
        </Optional>
        <View>{children}</View>
        <Text.Body align={TextAlign.Center} weight={FontWeights.Bold700} color={labelColor} style={labelStyle}>
          <Optional condition={isButtonLoading} fallback={label}>
            {loadingLabel}
          </Optional>
        </Text.Body>
      </HStack>
    </TouchableOpacity>
  )
}

export default Button
