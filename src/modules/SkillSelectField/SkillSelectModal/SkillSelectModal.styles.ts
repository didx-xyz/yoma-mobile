import { StyleSheet, ViewStyle } from 'react-native'

import bodyStyles from '~/components/Typography/Body/Body.styles'
import { Colors, colors } from '~/styles'

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
  } as ViewStyle,
  filterInput: {
    borderBottomColor: colors[Colors.MenuGrey],
    padding: 10,
    ...bodyStyles,
  } as ViewStyle,
  loader: {
    position: 'absolute',
    right: 4,
    top: 16,
  } as ViewStyle,
})

export default styles
