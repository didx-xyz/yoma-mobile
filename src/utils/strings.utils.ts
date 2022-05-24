import { __, concat, gte, head, join, juxt, length, pipe, tail, take, toUpper, trim, unless } from 'ramda'

export const getUppercasedHead = (data: string) => pipe(trim, head, toUpper)(data)

export const capitalize = pipe(juxt([pipe(head, toUpper), tail]), join(''))

export const textOrSpace = (condition: boolean, text: string) => (condition ? text : ' ')

export const trunc = (text: string, len: number) =>
  pipe(take(len), trim, unless(pipe(length, gte(len)), concat(__, '...')))(text)
