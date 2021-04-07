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
  } as ViewStyle,
}

export default StyleSheet.create(styles)
