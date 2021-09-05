import { curry, join, mergeRight, multiply, of, pipe, prepend } from 'ramda'

import { toFixed, toStringWithRadix } from '../utils/numbers.utils'
import colors from './colors.styles'
import { Colors } from './styles.types'

export const applyAlphaToHex = curry((color: string, alpha: number) =>
  pipe(multiply(256), toFixed(), toStringWithRadix(16), of, prepend(color), join(''))(alpha),
)

export const dropShadow = (x: number, y: number, blur: number, color: Colors, elevation: number | boolean = 4) => {
  const androidDropShadowProps = elevation ? { elevation } : {}

  return mergeRight(
    {
      shadowColor: colors[color],
      shadowOffset: {
        width: x,
        height: y,
      },
      shadowOpacity: 1,
      shadowRadius: blur,
    },
    androidDropShadowProps,
  )
}
