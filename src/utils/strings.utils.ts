import { filter, head, join, juxt, pipe, slice, tail, toUpper, trim } from 'ramda'

export const mapToDropDownArray = (array: Record<string, string>[], valueProp = 'key', labelProp = 'value') => {
  return array.map((opt: Record<string, string>) => ({
    label: opt[labelProp],
    value: opt[valueProp],
  }))
}
export const sliceAt = (number: Number, array: string[]) => slice(0, number, array)

export const getUppercasedHead = (data: string) => pipe(trim, head, toUpper)(data)

export const capitalize = pipe(juxt([pipe(head, toUpper), tail]), join(''))

export const filterStringArray = (value: string, array: string[]) =>
  filter((element: string) => element === value)(array)

export const textOrSpace = (condition: boolean, text: string) => (condition ? text : ' ')

export const dropElement = (value: string, array: string[]) => filter((element: string) => element !== value)(array)
