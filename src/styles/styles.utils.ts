import { join, multiply, of, pipe, prepend } from 'ramda'

import { toFixed, toStringWithRadix } from '../utils/numbers.utils'

export const applyAlphaToHex = (color: string) =>
  pipe(multiply(256), toFixed(), toStringWithRadix(16), of, prepend(color), join(''))
