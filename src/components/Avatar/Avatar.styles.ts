import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'
import { CIRCULAR_RADIUS_DIVISOR } from '../../styles/styles.constants'
import { AVATAR_SIZE } from './Avatar.constants'

const styles = {
  container: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / CIRCULAR_RADIUS_DIVISOR,
    position: 'relative',
  } as ViewStyle,
  verifiedWrap: {
    position: 'absolute',
    top: -2,
    right: -2,
    zIndex: 2,
  } as ViewStyle,
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  } as ImageStyle,
  avatarFallbackContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AVATAR_SIZE / CIRCULAR_RADIUS_DIVISOR,
    backgroundColor: colors[Colors.lightGrey],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
