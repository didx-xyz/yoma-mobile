import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'

const BannerWidth = Dimensions.get('window').width

const styles = {
  container1: {
    alignItems: 'flex-start',
    width: BannerWidth,
    // height: BannerHeight,
    backgroundColor: 'blue',
    padding: 5,
  } as ViewStyle,
  titleView: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
  } as ViewStyle,
  titleContainer: {
    borderRadius: 20,
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    // borderWidth:1,
  } as ViewStyle,
  textView: {
    width: '90%',
    marginVertical: 15,
    alignSelf: 'center',
  } as ViewStyle,
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: colors[Colors.White],
    width: '100%',
    textAlign: 'center',
  } as TextStyle,
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors[Colors.White],
  } as TextStyle,
}

export default StyleSheet.create(styles)
