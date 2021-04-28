import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native'
import { applyAlphaToHex } from 'styles/styles.utils'

import { colors, Colors } from '../../styles'

const styles = {
  header: {
    height: 50,
    backgroundColor: colors[Colors.white],
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  } as ViewStyle,
  profileInnerView: {
    backgroundColor: colors[Colors.backgroundGrey],
    borderRadius: 14,
    height: 27,
    width: 27,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  backIconView: {
    position: 'absolute',
    left: 20,
  } as ViewStyle,
  backIcon: {
    height: 25,
  } as ImageStyle,
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
