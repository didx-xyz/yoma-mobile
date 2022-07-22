import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const BannerWidth = Dimensions.get('window').width
const BannerHeight = 120

const styles = {
  container1: {
    alignItems: 'center',
    width: BannerWidth,
    height: BannerHeight,
  } as ViewStyle,
  titleView: {
    alignItems: 'center',
    alignContent: 'center',
  } as ViewStyle,
  textView: {
    alignItems: 'center',
    alignContent: 'center',
  } as ViewStyle,
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: colors[Colors.White],
    marginHorizontal: 20,
    padding: 8,
  } as TextStyle,
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    padding: 8,
    color: colors[Colors.White],
  } as TextStyle,
}

export default StyleSheet.create(styles)
