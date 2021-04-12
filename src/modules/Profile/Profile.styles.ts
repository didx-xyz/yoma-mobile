import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.unsavedStyleLightGrey],
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    width: '95%',
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 3,
    alignItems: 'center',
    marginTop: 50,
  } as ViewStyle,
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  } as ImageStyle,
  editIcon: {
    elevation: 3,
    backgroundColor: colors[Colors.white],
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    bottom: -5,
  } as ViewStyle,
  profileOuterStyle: {
    marginTop: -50,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
