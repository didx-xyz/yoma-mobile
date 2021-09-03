import { TextStyle } from 'react-native'

import { FontWeights } from './Text.types'

export const fontWeights: Record<FontWeights, TextStyle> = {
  [FontWeights.Normal400]: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  } as TextStyle,
  [FontWeights.Medium500]: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
  } as TextStyle,
  [FontWeights.SemiBold600]: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  } as TextStyle,
  [FontWeights.Bold700]: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  } as TextStyle,
}
