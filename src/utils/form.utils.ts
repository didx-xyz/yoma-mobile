import { and, equals, evolve, not } from 'ramda'
import { StdObj } from 'types/general.types'

import * as DatUtils from './dates.utils'

export const getHasValuesChanged = (initialValues: StdObj, values: StdObj, isValid: boolean) =>
  and(not(equals(initialValues, values)), isValid)

export const sanitiseDateRange = evolve({
  startDate: DatUtils.toJSON,
  endDate: DatUtils.toJSON,
})
