import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

const { width } = Dimensions.get('window')

const styles = {
  dropDownStyle: {
    borderColor: colors[Colors.tertiary9],
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
  } as ViewStyle,
  dropDownViewStyle: {
    width: '90%',
    alignSelf: 'center',
  } as ViewStyle,
  label: {
    color: colors[Colors.tertiary9],
    marginLeft: 10,
  },
  tag: {
    backgroundColor: '#72C8ED15',
    borderRadius: 20,
    padding: 10,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  crossIcon: {
    marginRight: 5,
  } as ViewStyle,
  dropDownContainerStyle: {
    height: 45,
  } as ViewStyle,
  tagText: {
    color: colors[Colors.tertiary10],
  } as TextStyle,
}

export default StyleSheet.create(styles)
