import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    paddingBottom: 30,
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  logoContainer: {
    paddingVertical: 20,
    alignSelf: 'center',
  } as ViewStyle,
  yellowSemiCircleContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  } as ViewStyle,
  card: {
    marginTop: '-20%',
  } as ViewStyle,
  horizontalLineView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  horizontalLine: {
    backgroundColor: colors[Colors.backgroundGrey],
    height: 1,
    flex: 1,
  } as ViewStyle,
  bodyText: {
    marginHorizontal: 20,
    paddingBottom: 25,
  } as TextStyle,
  cardHeaderText: {
    marginVertical: 17,
  } as TextStyle,
  button: {
    marginBottom: 23,
  } as ViewStyle,
  skipButton: {
    marginBottom: 23,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
