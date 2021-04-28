import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.backgroundGrey],
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    marginHorizontal: 13,
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 3,
    marginTop: 50,
    paddingHorizontal: 13,
  } as ViewStyle,
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: -50,
  } as ImageStyle,
  editIcon: {
    elevation: 3,
    backgroundColor: colors[Colors.white],
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    bottom: -5,
  } as ViewStyle,
  profileOuterView: {
    marginTop: -50,
    alignSelf: 'center',
  } as ViewStyle,
  logout: {
    marginVertical: 20,
  } as TextStyle,
}

export default StyleSheet.create(styles)
