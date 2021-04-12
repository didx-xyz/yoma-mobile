import { StyleSheet, ViewStyle, Dimensions, ImageStyle, TextStyle } from 'react-native'

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
    backgroundColor: '#F3F3F8',
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
    backgroundColor: colors[Colors.tertiary11],
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 11,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
