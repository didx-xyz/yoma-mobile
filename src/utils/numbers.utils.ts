export const toFixed = (digits?: number) => (num: number) => num.toFixed(digits)
export const toStringWithRadix = (radix?: number) => (val: number | string) => Number(val).toString(radix)
