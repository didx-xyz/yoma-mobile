import { StyleSheet, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'
import { ButtonTypes } from './Button.types'

const primaryBaseStyle = {
  height: 45,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 60,
  borderWidth: 1,
} as ViewStyle

const styles = {
  [ButtonTypes.Primary]: {
    ...primaryBaseStyle,
    backgroundColor: colors[Colors.primaryGreen],
    borderColor: colors[Colors.primaryGreen],
  } as ViewStyle,
  [ButtonTypes.PrimaryOutline]: {
    ...primaryBaseStyle,
    backgroundColor: colors[Colors.transparent],
    borderColor: colors[Colors.primaryGreen],
  } as ViewStyle,
  [ButtonTypes.PrimaryClear]: {
    ...primaryBaseStyle,
    backgroundColor: colors[Colors.transparent],
    borderColor: colors[Colors.transparent],
  } as ViewStyle,
  [ButtonTypes.Secondary]: {} as ViewStyle,
  fullWidth: {
    flex: 1,
    marginHorizontal: 12,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
