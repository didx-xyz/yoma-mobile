import { StyleSheet, ViewStyle } from 'react-native'

import { fontWeights } from '~/components/Typography/fontWeights.styles'

const styles = {
  container: {
    padding: 3,
    paddingLeft: 0,
    ...fontWeights.medium500,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
