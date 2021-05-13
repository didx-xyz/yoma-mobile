import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  form: {
    flex: 1,
    padding: 12,
  } as ViewStyle,
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  } as ViewStyle,
  placeholder: {
    color: colors[Colors.menuGrey],
    marginLeft: 0,
  } as ViewStyle,
  iconInfo: {
    marginRight: 5,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
