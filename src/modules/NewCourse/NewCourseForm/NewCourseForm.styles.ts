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
    marginVertical: 15,
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
  verificationText: {
    paddingRight: 20,
  },
})

export default styles
