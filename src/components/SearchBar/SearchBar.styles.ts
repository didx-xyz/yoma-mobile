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
    fontSize: 14,
    color: colors[Colors.PrimaryDarkGrey],
    fontFamily: fontStyles.medium,
  } as TextStyle,
  viewSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  } as TextStyle,
  iconSearch: {
    height: 15,
    width: 15,
  } as ImageStyle,
  searchContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
  } as ViewStyle,
  container: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
}
export default StyleSheet.create(styles)
