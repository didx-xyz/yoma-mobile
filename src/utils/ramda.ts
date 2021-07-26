import { complement, isNil } from 'ramda'

export const isNotNil = complement(isNil)
