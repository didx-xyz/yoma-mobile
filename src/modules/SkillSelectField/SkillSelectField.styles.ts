import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../styles'
import { applyAlphaToHex } from '../../styles/styles.utils'

const styles = {
  filterInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    padding: 10,
    margin: 10,
  } as ViewStyle,
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: applyAlphaToHex(colors[Colors.Black], 0.5),
  } as ViewStyle,
  modal: {
    backgroundColor: colors[Colors.White],
    padding: 5,
    margin: 10,
    marginTop: 40,
    borderRadius: 12,
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
