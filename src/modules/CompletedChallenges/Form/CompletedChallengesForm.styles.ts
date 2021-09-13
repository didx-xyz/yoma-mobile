import { StyleSheet, ViewStyle } from 'react-native'

import { Colors, colors } from '../../../styles'

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  } as ViewStyle,
  iconInfo: {
    marginRight: 5,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
