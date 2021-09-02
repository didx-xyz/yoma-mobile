import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  yellowCircleContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  } as ViewStyle,
  card: {
    marginTop: -75,
  } as ViewStyle,
  registerText: {
    marginTop: 18,
    marginBottom: 8,
  },
  notice: {
    marginVertical: 35,
  } as TextStyle,
}

export default StyleSheet.create(styles)
