import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'
import { SocialVariants } from './SocialButton.types'

const baseStyle = {
  height: 47,
}

const styles = {
  container: {
    position: 'relative',
    alignSelf: 'stretch',
  } as ViewStyle,
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 0,
    bottom: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  } as ViewStyle,
  [SocialVariants.Facebook]: {
    ...baseStyle,
    backgroundColor: colors[Colors.FacebookBlue],
  } as ViewStyle,
  [SocialVariants.Google]: {
    ...baseStyle,
    borderColor: colors[Colors.GoogleRed],
  } as ViewStyle,
}

export default StyleSheet.create(styles)
