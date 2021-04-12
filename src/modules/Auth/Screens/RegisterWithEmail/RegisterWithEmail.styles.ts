import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors[Colors.tertiary4],
  } as ViewStyle,
  yellowCircleContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    alignSelf: 'center',
    marginTop: '-30%',
    width: '90%',
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 3,
  } as ViewStyle,
  scrollView: {} as ViewStyle,
}

export default StyleSheet.create(styles)
