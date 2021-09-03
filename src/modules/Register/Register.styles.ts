import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  purpleSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  } as ViewStyle,
  card: {
    marginTop: -75,
    alignItems: 'center',
    paddingBottom: 27,
  } as ViewStyle,
  welcomeText: {
    marginTop: 17,
  } as TextStyle,
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
  orText: {
    paddingHorizontal: 15,
  } as TextStyle,
  bodyText: {
    marginTop: 25,
    marginBottom: 15,
  } as TextStyle,
  bottomText: {
    marginTop: 20,
  } as TextStyle,
  button: {
    marginVertical: 25,
  },
}

export default StyleSheet.create(styles)
