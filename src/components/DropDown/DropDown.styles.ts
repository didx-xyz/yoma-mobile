import { Dimensions, StyleSheet, ViewStyle } from 'react-native'

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
}

export default StyleSheet.create(styles)
