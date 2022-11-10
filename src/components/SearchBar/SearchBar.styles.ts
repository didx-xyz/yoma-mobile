import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import fontStyles from '~/styles/font.styles'

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
    fontSize: 10,
    color: colors[Colors.PrimaryDarkGrey],
    fontFamily: fontStyles.bold,
    fontWeight: '500',
    alignItems: 'center',
    padding: 1,
  } as unknown as TextStyle,
  viewSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  } as TextStyle,
  iconSearch: {
    color: 'black',
  } as ImageStyle,
  searchContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
  } as ViewStyle,
  container: {
    height: 30,
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
}
export default StyleSheet.create(styles)
