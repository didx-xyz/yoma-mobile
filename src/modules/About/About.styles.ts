import textinputStyles from 'components/Input/Input.styles'
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
    ...textinputStyles.textInput,
    width: '100%',
    flex: 1,
    paddingLeft: 0,
    textAlignVertical: 'top',
  } as ViewStyle,
  bottomText: {
    marginVertical: 10,
  } as TextStyle,
}

export default StyleSheet.create(styles)
