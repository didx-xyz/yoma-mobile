import { head, pipe, prop, uniqBy } from 'ramda'

import { mapIndex } from '~/utils/ramda.utils'

import { NavLetter } from './AlphabetListNavigator.types'

export const navLetters = (data: string[]): NavLetter[] =>
  pipe(
    mapIndex((name: string, id: number) => ({
      id,
      name: head(name),
    })),
    uniqBy(prop('name')),
  )(data)
