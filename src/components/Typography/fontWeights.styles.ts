import { StyleSheet, TextStyle } from 'react-native'

import { FontWeights } from './Text.types'

export const fontWeights: Record<FontWeights, TextStyle> = {
  [FontWeights.normal_400]: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  } as TextStyle,
  [FontWeights.medium_500]: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
  } as TextStyle,
  [FontWeights.semiBold_600]: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  } as TextStyle,
  [FontWeights.bold_700]: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  } as TextStyle,
}
