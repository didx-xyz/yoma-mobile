import textinputStyles from 'components/Input/Input.styles'
import { StyleSheet, ViewStyle } from 'react-native'
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
  bottom: {
    paddingVertical: 16,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
