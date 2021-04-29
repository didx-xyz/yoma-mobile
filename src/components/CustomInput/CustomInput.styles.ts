import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  textInput: {
    height: 40,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
  } as ViewStyle,
}

export default StyleSheet.create(styles)
