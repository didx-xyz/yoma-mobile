import { StyleSheet, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'

const styles = {
  editIcon: {
    elevation: 3,
    backgroundColor: colors[Colors.white],
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    bottom: -5,
  } as ViewStyle,
  imageWrap: {
    overflow: 'hidden',
  } as ViewStyle,
}

export default StyleSheet.create(styles)
