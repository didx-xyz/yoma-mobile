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
  whiteCard: {
    backgroundColor: colors[Colors.white],
    marginTop: '-20%',
    marginHorizontal: 13,
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 3,
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
    marginVertical: 15,
    paddingHorizontal: 20,
  } as TextStyle,
  cardHeaderText: {
    paddingTop: 10,
    paddingBottom: 15,
  } as TextStyle,
  button: {
    marginVertical: 15,
    alignSelf: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
