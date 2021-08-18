export type StdObj<T = any> = Record<string, T>
export type StdFn<T = any, R = void> = (args: T, identifier?: string) => R
