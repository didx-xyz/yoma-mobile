import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

import { ButtonSizes, ButtonVariants } from './Button.types'

const baseStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 16,
  borderRadius: 60,
  borderWidth: 1,
  minHeight: 40,
} as ViewStyle

const styles = {
  [ButtonVariants.Primary]: {
    ...baseStyle,
    backgroundColor: colors[Colors.PrimaryGreen],
    borderColor: colors[Colors.PrimaryGreen],
  } as ViewStyle,
  [ButtonVariants.Outline]: {
    ...baseStyle,
    backgroundColor: colors[Colors.Transparent],
    borderColor: colors[Colors.PrimaryGreen],
  } as ViewStyle,
  [ButtonVariants.Clear]: {
    ...baseStyle,
    backgroundColor: colors[Colors.Transparent],
    borderColor: colors[Colors.Transparent],
  } as ViewStyle,
  [ButtonSizes.Default]: {
    height: 45,
  } as ViewStyle,
  [ButtonSizes.Slim]: {
    height: 37,
  } as ViewStyle,
  fullWidth: {
    alignSelf: 'stretch',
    position: 'relative',
    marginHorizontal: 12,
  } as ViewStyle,
  loading: {
    paddingRight: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
