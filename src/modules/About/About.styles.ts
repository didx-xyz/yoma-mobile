import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  card: {
    flex: 1,
  } as ViewStyle,
  textInput: {
    borderBottomWidth: 1,
    width: '100%',
    flex: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
    paddingLeft: 0,
    textAlignVertical: 'top',
  } as ViewStyle,
  bottom: {
    paddingVertical: 16,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
