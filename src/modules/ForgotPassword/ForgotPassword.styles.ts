import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    paddingBottom: 30,
    backgroundColor: colors[Colors.BackgroundGrey],
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
  bodyText: {
    marginHorizontal: 20,
    paddingBottom: 25,
  } as TextStyle,
  cardHeaderText: {
    marginVertical: 17,
  } as TextStyle,
  skipButton: {
    marginVertical: 30,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
