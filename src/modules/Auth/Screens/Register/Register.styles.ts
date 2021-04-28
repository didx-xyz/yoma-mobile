import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.unsavedStyleLightGrey],
  } as ViewStyle,
  purpleSemiCircleContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    marginTop: '-20%',
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
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
  orText: {
    paddingHorizontal: 15,
  } as TextStyle,
  bodyText: {
    marginTop: 15,
  } as TextStyle,
  bottomText: {
    marginTop: 30,
  } as TextStyle,
  button: {
    marginVertical: 15,
  },
}

export default StyleSheet.create(styles)
