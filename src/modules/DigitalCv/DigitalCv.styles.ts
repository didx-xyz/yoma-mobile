import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.unsavedStyleLightGrey],
    alignItems: 'center',
  } as ViewStyle,
  scrollContainer: {
    paddingVertical: 15,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
