import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors, FontFamily } from 'styles'

import fontStyles from '../../../../styles/font.styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.unsavedStyleLightGrey],
  } as ViewStyle,
  cardHeader: {
    paddingTop: 10,
    paddingBottom: 15,
  } as TextStyle,
  forgotPassword: {
    marginVertical: 5,
  } as TextStyle,
  orText: {
    paddingHorizontal: 15,
  } as TextStyle,
  loginSocial: {
    paddingHorizontal: 15,
  } as TextStyle,
  noAccount: {
    marginVertical: 30,
  } as TextStyle,
  topContainer: {
    backgroundColor: colors[Colors.primaryYellow],
    height: '40%',
  } as ViewStyle,
  logoContainer: {
    alignSelf: 'center',
  } as ViewStyle,
  yellowSemiCircleContainer: {
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
    elevation: 3,
  } as ViewStyle,
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
}

export default StyleSheet.create(styles)
