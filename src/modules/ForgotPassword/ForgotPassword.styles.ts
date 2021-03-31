import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    paddingBottom: 30,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors[Colors.tertiary4]
  } as ViewStyle,
  topContainer: {
    backgroundColor: colors[Colors.secondary],
    height: '40%'
  } as ViewStyle,
  logoContainer: {
    paddingVertical: 20
  } as ViewStyle,
  yellowSemiCircleContainer: {
    position: 'absolute',
    left: 0,
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
  } as ViewStyle,
  bodyText: {
    marginVertical: 15,
    textAlign: 'center',
    paddingHorizontal: 20
  } as TextStyle
}

export default StyleSheet.create(styles)
