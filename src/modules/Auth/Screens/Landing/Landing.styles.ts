import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.primaryYellow],
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  redSemiCircleContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  } as ViewStyle,
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 50,
  } as ViewStyle,
  purpleSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  } as ViewStyle,
  buttonOuterContainer: {
    position: 'absolute',
    bottom: 50,
  } as ViewStyle,
  registerButton: {
    marginHorizontal: 45,
  } as ViewStyle,
  loginButton: {
    marginTop: 10,
    marginHorizontal: 45,
  } as ViewStyle,
  bodyText: {
    marginTop: 10,
    paddingHorizontal: 20,
  } as TextStyle,
}

export default StyleSheet.create(styles)
