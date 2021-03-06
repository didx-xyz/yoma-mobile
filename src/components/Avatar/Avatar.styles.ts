import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { Colors, constants as StyleConstants, colors } from '~/styles'

import { AVATAR_SIZE } from './Avatar.constants'

const styles = {
  container: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / StyleConstants.CIRCULAR_RADIUS_DIVISOR,
    position: 'relative',
  } as ViewStyle,
  verifiedWrap: {
    position: 'absolute',
    top: -2,
    right: -2,
    zIndex: 2,
  } as ViewStyle,
  imageWrap: {
    borderRadius: AVATAR_SIZE / StyleConstants.CIRCULAR_RADIUS_DIVISOR,
    overflow: 'hidden',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
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
    borderRadius: AVATAR_SIZE / StyleConstants.CIRCULAR_RADIUS_DIVISOR,
    backgroundColor: colors[Colors.LightGrey],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
