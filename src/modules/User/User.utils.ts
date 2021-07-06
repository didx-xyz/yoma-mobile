import { mergeRight, path, pick, pipe, __ } from 'ramda'

import { selectUser } from './User.selector'

export const selectUserFromLoginPayload = pipe(path(['payload', 'data', 'data', 'user']))
export const selectUserFromUpdatePayload = pipe(path(['payload', 'data', 'data']))
export const selectUserId = pipe(path(['user', 'id']))
export const extractUser = (payload: any) =>
  pipe(
    selectUser,
    pick(['firstName', 'lastName', 'phoneNumber', 'countryAlpha2', 'biography']),
    mergeRight(__, payload),
  )
