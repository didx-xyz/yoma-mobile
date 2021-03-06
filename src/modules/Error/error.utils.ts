import i18n from 'i18next'
import { path } from 'ramda'

export const extractErrorResponseMessage = path(['payload', 'data', 'meta', 'message'])
export const getErrorMessageWithFallback = (error: any, fallbackMessage = i18n.t('general.errorMessageTryAgain')) => {
  if (typeof error === 'string') {
    return error
  }
  return error.message ?? fallbackMessage
}
