import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  outerCard: {
    paddingHorizontal: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
