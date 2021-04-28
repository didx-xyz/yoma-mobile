import { StyleSheet, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'
import { ButtonSizes, ButtonVariants } from './Button.types'

const baseStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 16,
  borderRadius: 60,
  borderWidth: 1,
} as ViewStyle

const styles = {
  [ButtonVariants.Primary]: {
    ...baseStyle,
    backgroundColor: colors[Colors.primaryGreen],
    borderColor: colors[Colors.primaryGreen],
  } as ViewStyle,
  [ButtonVariants.Outline]: {
    ...baseStyle,
    backgroundColor: colors[Colors.transparent],
    borderColor: colors[Colors.primaryGreen],
  } as ViewStyle,
  [ButtonVariants.Clear]: {
    ...baseStyle,
    backgroundColor: colors[Colors.transparent],
    borderColor: colors[Colors.transparent],
  } as ViewStyle,
  [ButtonSizes.Default]: {
    height: 45,
  } as ViewStyle,
  [ButtonSizes.Slim]: {
    height: 37,
  } as ViewStyle,
  fullWidth: {
    flex: 1,
    marginHorizontal: 12,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
