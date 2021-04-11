import { StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.tertiary8],
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  certificateCountView: {
    height: 25,
    width: 25,
    maxWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 12,
    marginRight: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
