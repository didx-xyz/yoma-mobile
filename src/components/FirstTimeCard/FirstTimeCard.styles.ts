import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const styles = {
  cardView: {
    backgroundColor: colors[Colors.primaryYellow],
    width: '97%',
    borderRadius: 25,
    alignSelf: 'center',
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 20,
  } as ViewStyle,
  bodyText: {
    zIndex: 1,
    marginTop: 5,
  } as TextStyle,
  progressBar: {
    height: 6,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors[Colors.white],
    borderRadius: 18,
    zIndex: 1,
  } as ViewStyle,
  innerProgressbar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors[Colors.primaryRed],
    borderRadius: 18,
  } as ViewStyle,
  percentText: {
    textAlign: 'right',
    paddingRight: 10,
    zIndex: 1,
    paddingVertical: 5,
  } as TextStyle,
  buttonStyle: {
    zIndex: 1,
  } as ViewStyle,
  blueCircle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 0,
  } as ViewStyle,
  yellowPattern: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 0,
  } as ViewStyle,
  hostedText: {
    flexDirection: 'row',
    marginVertical: 10,
  } as TextStyle,
}

export default StyleSheet.create(styles)
