import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { CIRCULAR_RADIUS_DIVISOR } from 'styles/styles.constants'
import { applyAlphaToHex } from 'styles/styles.utils'

import { colors, Colors } from '../../styles'

const PROFILE_IMAGE_SIZE = 27

const styles = {
  container: {
    height: 50,
    backgroundColor: colors[Colors.white],
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 13,
    elevation: 3,
  } as ViewStyle,
  profileContainer: {
    backgroundColor: colors[Colors.backgroundGrey],
    borderRadius: PROFILE_IMAGE_SIZE / CIRCULAR_RADIUS_DIVISOR,
    height: PROFILE_IMAGE_SIZE,
    width: PROFILE_IMAGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  tokensView: {
    backgroundColor: applyAlphaToHex(colors[Colors.primaryYellow])(0.15),
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
