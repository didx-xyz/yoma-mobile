import { addIndex, assoc, chain, complement, curry, isNil, keys, map, reduce, zipObj } from 'ramda'

import { StdObj } from '~/types/general.types'

export const isNotNil = complement(isNil)

export const mapIndex = addIndex(map)

// via: https://github.com/ramda/ramda/wiki/Cookbook#make-an-object-out-of-a-list-with-keys-derived-from-each-element
export const objFromListWith = curry((fn: Function, list: any[]) => chain(zipObj, map(fn))(list))

// via: https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object
/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @sig {a: b} -> {a: *} -> {b: *}
 */
export const renameKeys = curry((keysMap: StdObj<string>, obj: StdObj) =>
  reduce((acc: StdObj, key: string) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj)),
)
