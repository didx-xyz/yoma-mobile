import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import { TEXT_INPUT_HEIGHT } from './DatePicker.constants'

const styles = {
  container: {
    flex: 1,
  } as ViewStyle,
  textInputStyle: {
    height: TEXT_INPUT_HEIGHT,
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
  } as ViewStyle,
  dateInput: {
    alignItems: 'flex-start',
    borderWidth: 0,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
