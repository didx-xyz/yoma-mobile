import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 12,
  } as ViewStyle,
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  checkBox: {
    marginRight: 10,
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
    position: 'absolute',
    top: 0,
    right: 0,
  } as ViewStyle,
})

export default styles
