import { append, ascend, curry, ifElse, includes, map, prop, sort, without } from 'ramda'

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

export const withoutElseAppend = (element: string) => ifElse(includes(element), without(element), append(element))
