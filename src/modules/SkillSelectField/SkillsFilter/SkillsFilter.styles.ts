import { StyleSheet, ViewStyle } from 'react-native'

import bodyStyles from '~/components/Typography/Body/Body.styles'
import { Colors, colors } from '~/styles'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
  } as ViewStyle,
  filterInput: {
    borderBottomColor: colors[Colors.MenuGrey],
    padding: 10,
    ...bodyStyles.regular,
  } as ViewStyle,
})

export default styles
