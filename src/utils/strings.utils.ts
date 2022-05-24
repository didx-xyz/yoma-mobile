import { __, concat, gt, head, join, juxt, length, lt, pipe, tail, take, toUpper, trim, unless, when } from 'ramda'

export const getUppercasedHead = (data: string) => pipe(trim, head, toUpper)(data)

export const capitalize = pipe(juxt([pipe(head, toUpper), tail]), join(''))

export const textOrSpace = (condition: boolean, text: string) => (condition ? text : ' ')

export const trunc = (text: string, len: number) =>
  pipe(take(len), unless(pipe(length, gt(len)), pipe(trim, concat(__, '...'))), trim)(text)
