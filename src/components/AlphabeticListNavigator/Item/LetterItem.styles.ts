import { StyleSheet, ViewStyle } from 'react-native'

import { fontWeights } from '~/components/Typography/fontWeights.styles'

import { NAV_ITEM_HEIGHT } from '../AlphabeticListNavigator.constants'

const styles = {
  container: {
    ...fontWeights.bold700,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: NAV_ITEM_HEIGHT,
    zIndex: 2,
  } as ViewStyle,
}

export default StyleSheet.create(styles)
