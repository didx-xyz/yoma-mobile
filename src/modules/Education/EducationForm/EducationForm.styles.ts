import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 12,
  } as ViewStyle,
  checkBoxView: {
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
  bottom: {
    borderTopWidth: 1,
    borderColor: applyAlphaToHex(colors[Colors.menuGrey])(0.7),
    marginTop: 10,
  } as ViewStyle,
  bottomText: {
    marginVertical: 10,
  } as TextStyle,
})

export default styles
