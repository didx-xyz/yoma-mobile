import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    paddingBottom: 30,
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  topContainer: {
    backgroundColor: colors[Colors.primaryYellow],
    height: '40%',
  } as ViewStyle,
  logoContainer: {
    paddingVertical: 20,
  } as ViewStyle,
  yellowSemiCircleContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    alignSelf: 'center',
    marginTop: '-20%',
    width: '90%',
    alignItems: 'center',
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
}

export default StyleSheet.create(styles)
