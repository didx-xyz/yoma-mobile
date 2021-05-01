import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

const styles = {
  redSemiCircle: {
    position: 'absolute',
    left: 0,
    top: 0,
  } as ViewStyle,
  purpleSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  } as ViewStyle,
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  } as ViewStyle,
  logoContainer: {
    flex: 1,
    marginTop: 60,
  } as ViewStyle,
  content: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 80,
  } as ViewStyle,
  bodyText: {
    marginTop: 10,
    paddingHorizontal: 20,
  } as TextStyle,
  actionsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 'auto',
    marginBottom: 60,
    justifyContent: 'flex-end',
  } as ViewStyle,
  registerButton: {
    marginHorizontal: 45,
  } as ViewStyle,
  loginButton: {
    marginTop: 10,
    marginHorizontal: 45,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
