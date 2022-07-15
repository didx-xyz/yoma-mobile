import { createSelector } from '@reduxjs/toolkit'
import { Country } from 'countries-list'
import { mapObjIndexed, mergeRight, pipe, values } from 'ramda'

import { selectCountries } from '~/modules/Countries/Countries.selector'
import { normaliseFn, sortIDs } from '~/redux/redux.utils'

export default createSelector(selectCountries, countries => {
  const { ids, entities } = pipe(
    mapObjIndexed((value: Country, key: string) => mergeRight({ code: key }, value)),
    values,
    normaliseFn('name'),
  )(countries)

  return { ids: sortIDs(ids), entities }
})
