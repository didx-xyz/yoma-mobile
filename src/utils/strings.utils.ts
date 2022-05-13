import { head, join, juxt, pipe, tail, toUpper, trim } from 'ramda'

export const getUppercasedHead = (data: string) => pipe(trim, head, toUpper)(data)

export const capitalize = pipe(juxt([pipe(head, toUpper), tail]), join(''))

export const textOrSpace = (condition: boolean, text: string) => (condition ? text : ' ')
