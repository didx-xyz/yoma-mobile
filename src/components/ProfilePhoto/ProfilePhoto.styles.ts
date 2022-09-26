import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

const styles = {
  editIcon: {
    elevation: 3,
    backgroundColor: colors[Colors.White],
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
