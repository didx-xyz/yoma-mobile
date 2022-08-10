import { always, head, length, lt, multiply, pipe, prop, uniqBy, when } from 'ramda'

import { isOdd } from '~/utils/boolean.utils'
import { mapIndex } from '~/utils/ramda.utils'

import { NAV_ITEM_HEIGHT } from './AlphabeticListNavigator.constants'
import { NavLetter } from './AlphabeticListNavigator.types'

export const shouldAdjustHeight = (viewHeight: number, itemHeight = NAV_ITEM_HEIGHT) =>
  pipe(length, multiply(itemHeight), lt(viewHeight))

const indexedLetter = (name: string, index: number) => ({
  index,
  name: head(name),
})

const addSpacerWhenOdd =
  (bullet = '•') =>
  (item: NavLetter, index: number) =>
    when(always(isOdd(index)), always({ name: bullet, index, isSpacer: true }))(item)

export const navLetters = (shouldAddBullets: boolean) =>
  pipe(mapIndex(indexedLetter), uniqBy(prop('name')), when(always(shouldAddBullets), mapIndex(addSpacerWhenOdd('•'))))
