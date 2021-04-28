import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.unsavedStyleLightGrey],
  } as ViewStyle,
  yellowCircleContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    marginTop: '-30%',
    marginHorizontal: 10,
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 3,
  } as ViewStyle,
  notice: {
    marginVertical: 30,
  } as TextStyle,
}

export default StyleSheet.create(styles)
