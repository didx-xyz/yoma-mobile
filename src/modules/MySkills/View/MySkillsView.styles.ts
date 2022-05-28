import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'

import * as StyleUtils from '../../../styles/styles.utils'

const styles = {
  container: {
    backgroundColor: colors[Colors.White],
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 60,
    marginHorizontal: 10,
    padding: 10,
    ...StyleUtils.dropShadow(5, 5, 23, StyleUtils.applyAlphaToHex(Colors.DarkGrey02, 0.15), 5),
  } as ViewStyle,
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors[Colors.LightGrey],
    paddingBottom: 8,
  } as ViewStyle,
  listHeaderText: {
    marginLeft: 10,
  } as TextStyle,
}

export default StyleSheet.create(styles)
