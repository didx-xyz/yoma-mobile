import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { CIRCULAR_RADIUS_DIVISOR } from '~/styles/styles.constants'
import { applyAlphaToHex } from '~/styles/styles.utils'

import { Colors, colors } from '../../styles'

const PROFILE_IMAGE_SIZE = 27

const styles = {
  container: {
    height: 50,
    backgroundColor: colors[Colors.White],
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 13,
    elevation: 3,
    shadowColor: colors[Colors.Black],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  } as ViewStyle,
  profileContainer: {
    backgroundColor: colors[Colors.BackgroundGrey],
    borderRadius: PROFILE_IMAGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
    height: PROFILE_IMAGE_SIZE,
    width: PROFILE_IMAGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  tokensView: {
    backgroundColor: applyAlphaToHex(colors[Colors.PrimaryYellow])(0.15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 11,
  } as ViewStyle,
  tokenAmount: {
    paddingLeft: 4,
  } as TextStyle,
}

export default StyleSheet.create(styles)
