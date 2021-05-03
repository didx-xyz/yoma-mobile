import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  container: {
    flex: 1,
  } as ViewStyle,
  textInput: {
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
  } as ViewStyle,
}

export default StyleSheet.create(styles)
