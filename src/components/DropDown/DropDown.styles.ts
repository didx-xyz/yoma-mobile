import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const { width } = Dimensions.get('window')

const styles = {
  dropDownStyle: {
    backgroundColor: colors[Colors.tertiary10],
    width: width / 1.3,
    alignSelf: 'center',
    borderWidth: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  } as ViewStyle,
  dropDownViewStyle: {
    backgroundColor: colors[Colors.tertiary10],
    width: '90%',
    alignSelf: 'center',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
