import { createAction } from '@reduxjs/toolkit'

import { ApiMeta } from './api.types'

const name = '[api]'
type ApiRequestResponse = {
  payload: any | undefined
  meta: ApiMeta
}
export const apiRequest = createAction(
  `${name} apiRequest`,
  (meta: ApiMeta, payload?: any): ApiRequestResponse => ({ payload, meta }),
)

export const apiError = createAction<any>(`${name} apiError`)
