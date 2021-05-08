import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  formView: {
    padding: 12,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  } as ViewStyle,
  placeholder: {
    color: colors[Colors.menuGrey],
    marginLeft: 0,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
