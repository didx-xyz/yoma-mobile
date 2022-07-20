import { createSelector } from '@reduxjs/toolkit'
import { evolve, pipe } from 'ramda'

import { NormalisedCountries } from '~/modules/Countries/Countries.types'
import { normaliseFn, sortIDs } from '~/redux/redux.utils'

import { selectCountriesWithCode } from '../CountrySelectField.selector'

export default createSelector<any, NormalisedCountries>(
  selectCountriesWithCode,
  pipe(
    normaliseFn('name'),
    evolve({
      ids: sortIDs,
    }),
  ),
)
