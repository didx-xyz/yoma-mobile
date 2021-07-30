import { chain, complement, curry, isNil, map, zipObj } from 'ramda'

export const isNotNil = complement(isNil)

// via: https://github.com/ramda/ramda/wiki/Cookbook#make-an-object-out-of-a-list-with-keys-derived-from-each-element
export const objFromListWith = curry((fn: Function, list: any[]) => chain(zipObj, map(fn))(list))
