import { and, equals, evolve, not, of } from 'ramda'

import { StdObj } from '~/types/general.types'

import * as DateUtils from './dates.utils'

export const getHasValuesChanged = (initialValues: StdObj, values: StdObj, isValid: boolean) =>
  and(not(equals(initialValues, values)), isValid)

export const sanitiseDateRange = evolve({
  startTime: DateUtils.toJSON,
  endTime: DateUtils.toJSON,
})

export const countriesAsArray = evolve({ countries: of })
