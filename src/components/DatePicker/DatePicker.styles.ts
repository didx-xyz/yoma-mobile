import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = {
  container: {
    flex: 1,
    marginRight: 15,
  } as ViewStyle,
  dateContainer: {
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
  } as ViewStyle,
}

export default StyleSheet.create(styles)
