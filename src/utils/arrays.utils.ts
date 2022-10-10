import { append, ascend, concat, curry, curryN, ifElse, includes, map, pipe, prop, sort, uniq, without } from 'ramda'

import { types as DropDownTypes } from '~/components/DropDown'

export const mapToDropDownArray = curry(
  (array: Record<string, string>[], valueProp = 'key', labelProp = 'value'): DropDownTypes.DropDownItem[] =>
    map((opt: Record<string, string>) => ({
      label: opt[labelProp],
      value: opt[valueProp],
    }))(array),
)

const ascendByDropDownLabel = ascend(prop('label'))

export const sortDropDownArray = sort(ascendByDropDownLabel)

export const withoutElseAppend = (element: any) => ifElse(includes(element), without(element), append(element))

export const concatUnique = curryN(2, pipe(concat, uniq))
