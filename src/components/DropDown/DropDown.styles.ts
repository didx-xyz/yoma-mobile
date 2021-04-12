import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const { width } = Dimensions.get('window')

const styles = {
  dropDownStyle: {
    backgroundColor: 'rgb(243,246,250)',
    width: width / 1.3,
    alignSelf: 'center',
    borderWidth: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  } as ViewStyle,
  dropDownViewStyle: {
    backgroundColor: 'rgb(243,246,250)',
    width: '90%',
    alignSelf: 'center',
  } as ViewStyle,
  label: {
    color: colors[Colors.tertiary9],
    marginLeft: 10,
  } as TextStyle,
}

export default StyleSheet.create(styles)
