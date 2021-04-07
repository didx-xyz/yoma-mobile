import { StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors[Colors.tertiary4]
  } as ViewStyle,
  topContainer: {
    backgroundColor: colors[Colors.secondary],
    height: '40%'
  } as ViewStyle,
  logoContainer: {
    alignSelf: 'center',
  } as ViewStyle,
  yellowSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0
  } as ViewStyle,
  whiteCard: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '-20%',
    width: "90%",
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 3
  } as ViewStyle,
  horizontalLineView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center'
  } as ViewStyle,
  horizontalLine: {
    backgroundColor: colors[Colors.tertiary4],
    height: 1,
    flex: 1
  } as ViewStyle
}

export default StyleSheet.create(styles)
