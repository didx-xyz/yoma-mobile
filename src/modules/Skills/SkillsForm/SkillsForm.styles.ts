import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = StyleSheet.create({
  container: {
    height: 300,
  } as ViewStyle,
  inner: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 10,
  } as ViewStyle,
  autocompleteInputContainer: {
    marginHorizontal: 10,
  } as ViewStyle,
  inputContainer: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors[Colors.menuGrey],
  } as ViewStyle,
})

export default styles
