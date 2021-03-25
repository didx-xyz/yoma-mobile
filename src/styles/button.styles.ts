import { Colors } from './styles.types';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { colors } from '.';

const { height, width } = Dimensions.get("window")


const ButtonStyles = StyleSheet.create({
  mediumGreenButton: {
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
})

export default ButtonStyles;
