import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const styles = {
  form: {
    paddingHorizontal: 20,
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
