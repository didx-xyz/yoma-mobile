export type StdObj<T = any> = Record<string, T>
export type StdFn<T = any, R = void> = (args: T, identifier?: string) => R
export type Modify<T, R> = Omit<T, keyof R> & R
export type Maybe<T> = T | null | undefined
