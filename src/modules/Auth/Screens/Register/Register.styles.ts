import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.unsavedStyleLightGrey],
  } as ViewStyle,
  topContainer: {
    backgroundColor: colors[Colors.primaryYellow],
    height: '40%',
  } as ViewStyle,
  logoContainer: {
    alignSelf: 'center',
  } as ViewStyle,
  purpleSemiCircleContainer: {
    position: 'absolute',
    right: 0,
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
  } as ViewStyle,
  cardHeader: {
    alignSelf: 'center',
  } as TextStyle,
  horizontalLineView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  horizontalLine: {
    backgroundColor: colors[Colors.unsavedStyleLightGrey],
    height: 1,
    flex: 1,
  } as ViewStyle,
  orText: {
    paddingHorizontal: 15,
  } as TextStyle,
}

export default StyleSheet.create(styles)
