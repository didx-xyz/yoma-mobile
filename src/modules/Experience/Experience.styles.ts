import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.unsavedStyleLightGrey],
  } as ViewStyle,
  whiteCard: {
    backgroundColor: colors[Colors.white],
    borderRadius: 12,
    elevation: 3,
    margin: 10,
  } as ViewStyle,

  cardView: {
    backgroundColor: colors[Colors.white],
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    marginTop: 10,
    marginHorizontal: 10,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
  } as ViewStyle,
  image: {
    height: 35,
    width: 35,
    marginHorizontal: 10,
  } as ImageStyle,
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 17,
    backgroundColor: colors[Colors.backgroundGrey],
    marginHorizontal: 10,
  } as ViewStyle,
  editIcon: {
    backgroundColor: colors[Colors.white],
    elevation: 3,
    borderRadius: 13,
    position: 'absolute',
    right: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
