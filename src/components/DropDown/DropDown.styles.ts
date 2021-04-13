import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const { width } = Dimensions.get('window')

const styles = {
  container: {
    height: 45,
    marginTop: 15,
  } as ViewStyle,
  dropDownStyle: {
    width: width / 1.3,
    alignSelf: 'center',
    borderWidth: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  } as ViewStyle,
  dropDownViewStyle: {
    backgroundColor: colors[Colors.white],
    width: '90%',
    alignSelf: 'center',
  } as ViewStyle,
  itemStyle: {
    justifyContent: 'flex-start',
  } as ViewStyle,
  labelStyle: {} as TextStyle,
  label: {
    marginLeft: 10,
  } as TextStyle,
}

export default StyleSheet.create(styles)
