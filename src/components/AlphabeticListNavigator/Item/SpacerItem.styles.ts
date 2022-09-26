import { StyleSheet, ViewStyle } from 'react-native'

import { fontWeights } from '~/components/Typography/fontWeights.styles'

const styles = {
  container: {
    ...fontWeights.bold700,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 10,
    top: -2,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
