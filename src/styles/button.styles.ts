import { Dimensions, StyleSheet, ViewStyle } from 'react-native'

import { colors } from '.'
import { Colors } from './styles.types'

const { height, width } = Dimensions.get('window')

const ButtonStyles = StyleSheet.create({
  mediumTertiary3Button: {
    backgroundColor: colors[Colors.tertiary3],
    height: height / 13,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.71,
    borderRadius: 60,
  } as ViewStyle,
  transparentButton: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  largeTertiary3Button: {
    backgroundColor: colors[Colors.tertiary3],
    height: height / 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 1.3,
    borderRadius: 60,
  } as ViewStyle,
  facebookButton: {
    backgroundColor: '#507CC0',
    height: height / 13,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width / 1.3,
    borderRadius: 60,
    flexDirection: 'row',
  } as ViewStyle,
  googleButton: {
    backgroundColor: colors[Colors.white],
    height: height / 13,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width / 1.3,
    borderRadius: 60,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DF4930',
  } as ViewStyle,
})

export default ButtonStyles
