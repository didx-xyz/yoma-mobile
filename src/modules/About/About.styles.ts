import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

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
    borderColor: colors[Colors.backgroundGrey],
    paddingLeft: 0,
    textAlignVertical: 'top',
  } as ViewStyle,
  bottomText: {
    marginVertical: 10,
  } as TextStyle,
}

export default StyleSheet.create(styles)
