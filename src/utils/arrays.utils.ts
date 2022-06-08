import { append, ifElse, includes, map, without } from 'ramda'

import { types as DropDownTypes } from '~/components/DropDown'

export const mapToDropDownArray = (
  array: Record<string, string>[],
  valueProp = 'key',
  labelProp = 'value',
): DropDownTypes.DropDownItem[] =>
  map((opt: Record<string, string>) => ({
    label: opt[labelProp],
    value: opt[valueProp],
  }))(array)

export const withoutElseAppend = (element: string) => ifElse(includes(element), without(element), append(element))
