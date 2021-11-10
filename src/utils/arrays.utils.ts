import { filter, map } from 'ramda'

export const mapToDropDownArray = (array: Record<string, string>[], valueProp = 'key', labelProp = 'value') =>
  map((opt: Record<string, string>) => ({
    label: opt[labelProp],
    value: opt[valueProp],
  }))(array)

export const dropElement = (value: string) => filter((element: string) => element !== value)
