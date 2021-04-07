import { StyleSheet, ViewStyle, Dimensions } from 'react-native'

import { colors, Colors } from '../../styles'

const { width, height } = Dimensions.get('window')

const styles = {
  editIcon: {
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    bottom: -5,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
