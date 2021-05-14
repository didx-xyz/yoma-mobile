import textinputStyles from 'components/Input/Input.styles'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    width: '95%',
    borderRadius: 12,
    paddingVertical: 5,
    elevation: 3,
    marginVertical: 10,
    alignSelf: 'center',
    paddingHorizontal: 15,
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
