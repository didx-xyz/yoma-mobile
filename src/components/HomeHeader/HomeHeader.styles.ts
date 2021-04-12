import { StyleSheet, ViewStyle, Dimensions, ImageStyle } from 'react-native'

import { colors, Colors } from '../../styles'

const { width, height } = Dimensions.get('window')

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
  profileInnerStyle: {
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
    backgroundColor: `${colors[Colors.primaryYellow]}15`,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 11,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
