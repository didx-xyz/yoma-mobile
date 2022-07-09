import { path } from 'ramda'

import * as Strings from '~/constants/strings.constants'

export const extractErrorResponseMessage = path(['payload', 'data', 'meta', 'message'])
export const getErrorMessageWithFallback = (
  error: any,
  fallbackMessage = Strings.OOPS_SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN,
) => {
  if (typeof error === 'string') {
    return error
  }
  return error.message ?? fallbackMessage
}
