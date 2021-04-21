import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import { TEXT_INPUT_HEIGHT } from './CustomInput.constants'

const styles = {
  textInputStyle: {
    height: TEXT_INPUT_HEIGHT,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
  } as ViewStyle,
}

export default StyleSheet.create(styles)
