import { and, equals, not } from 'ramda'
import { StdObj } from 'types/general.types'

export const getHasValuesChanged = (initialValues: StdObj, values: StdObj, isValid: boolean) =>
  and(not(equals(initialValues, values)), isValid)
