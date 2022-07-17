import { createSelector } from '@reduxjs/toolkit'
import { Country } from 'countries-list'
import { evolve, mapObjIndexed, mergeRight, pipe, prop, values } from 'ramda'

import { selectCountries } from '~/modules/Countries/Countries.selector'
import { normaliseFn, sortIDs } from '~/redux/redux.utils'

export default createSelector(
  selectCountries,
  pipe(
    prop('entities'),
    mapObjIndexed((value: Country, key: string) => mergeRight({ code: key }, value)),
    values,
    normaliseFn('name'),
    evolve({
      ids: sortIDs,
    }),
  ),
)
