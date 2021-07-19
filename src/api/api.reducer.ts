import { createAction } from '@reduxjs/toolkit'

import { ApiError, ApiErrorResponse, ApiMeta, ApiRequestResponse } from './api.types'

const name = '[api]'

export const apiRequest = createAction(
  `${name} apiRequest`,
  (meta: ApiMeta, payload?: any): ApiRequestResponse => ({ payload, meta }),
)

export const apiError = createAction(
  `${name} apiError`,
  (meta: ApiError, payload: any): ApiErrorResponse => ({ payload, meta }),
)
