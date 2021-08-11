import { filter, head, join, juxt, pipe, slice, tail, toUpper, trim } from 'ramda'
import { StdObj } from 'types/general.types'

export const sliceArrayByNumber = (number: Number, array: any[]) => slice(0, number, array)
export const searchArrayOfObjByValue = (query: string, array: any[]) =>
  filter((element: StdObj) => query.length > 1 && element.value.indexOf(query) > -1)(array)

export const getUppercasedHead = (data: string) => pipe(trim, head, toUpper)(data)

export const capitalize = pipe(juxt([pipe(head, toUpper), tail]), join(''))

export const filterStringArray = (value: string, array: string[]) =>
  filter((element: string) => element !== value)(array)

export const textOrSpace = (condition: boolean, text: string) => (condition ? text : ' ')

export const dropElement = (value: string, array: string[]) => filter((element: string) => element !== value)(array)
