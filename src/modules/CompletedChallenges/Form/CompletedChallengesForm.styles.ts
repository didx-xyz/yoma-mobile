import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../../styles'
import { utils as StyleUtils } from '../../../styles'

const styles = {
  container: {
    backgroundColor: colors[Colors.BackgroundGrey],
  } as ViewStyle,
  form: {
    flex: 1,
    padding: 12,
  } as ViewStyle,
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  } as ViewStyle,

  iconInfo: {
    marginRight: 5,
  } as ViewStyle,
  challengeDetails: {
    backgroundColor: StyleUtils.applyAlphaToHex(colors[Colors.SecondaryPurple], 0.1),
    padding: 8,
    borderRadius: 8,
    margin: 10,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
