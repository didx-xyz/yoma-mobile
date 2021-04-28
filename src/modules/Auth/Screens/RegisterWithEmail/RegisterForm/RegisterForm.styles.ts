import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const styles = {
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 13,
  } as ViewStyle,
  checkBox: {
    paddingRight: 10,
  } as ViewStyle,
  privacy: {
    textDecorationLine: 'underline',
  } as TextStyle,
  button: {
    marginVertical: 15,
    alignSelf: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
