import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  cardHeader: {
    paddingVertical: 17,
  } as TextStyle,
  forgotPassword: {
    marginBottom: 15,
  } as TextStyle,
  orText: {
    paddingHorizontal: 15,
  } as TextStyle,
  loginSocial: {
    padding: 15,
  } as TextStyle,
  noAccount: {
    marginVertical: 30,
  } as TextStyle,
  yellowSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  } as ViewStyle,
  card: {
    marginTop: -75,
  } as ViewStyle,
  horizontalLineView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  horizontalLine: {
    backgroundColor: colors[Colors.BackgroundGrey],
    height: 1,
    flex: 1,
  } as ViewStyle,
  social: {
    marginBottom: 20,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
