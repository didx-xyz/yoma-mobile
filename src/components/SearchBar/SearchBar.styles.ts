import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  textError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  } as TextStyle,
  viewClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  textInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  } as TextStyle,
  viewSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  } as TextStyle,
  iconSearch: {
    height: 20,
    width: 20,
  } as ImageStyle,
  searchContainer: {
    width: '90%',
    height: 40,
    borderRadius: 15,
    flexDirection: 'row',
    // marginHorizontal: 10,
  } as ViewStyle,
  container: {
    height: 40,
    width: '95%',
    borderRadius: 15,
    marginHorizontal: 15,
    alignItems: 'stretch',
    backgroundColor: colors[Colors.White],
  } as ViewStyle,
}
export default StyleSheet.create(styles)
