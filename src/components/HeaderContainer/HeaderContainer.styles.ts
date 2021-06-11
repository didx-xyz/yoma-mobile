import { StyleSheet, ViewStyle, Dimensions, ImageStyle } from 'react-native'

import { colors, Colors } from '../../styles'

const { width, height } = Dimensions.get('window')

const styles = {
  header: {
    width: '100%',
    height: height / 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  backIconView: {
    position: 'absolute',
    left: 20,
  } as ViewStyle,
  backIcon: {
    height: 25,
  } as ImageStyle,
}

export default StyleSheet.create(styles)
