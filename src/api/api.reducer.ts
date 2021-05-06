import { createAction } from '@reduxjs/toolkit'

import { StdObj } from '../types/general.types'
import { ApiMeta } from './api.types'

const name = '[api]'
export const apiRequest = createAction(`${name} apiRequest`, (meta: ApiMeta, payload?: StdObj) => ({ payload, meta }))
export const apiRequestSuccess = createAction<any>(`${name} apiRequestSuccess`)
export const apiRequestFailure = createAction<any>(`${name} apiRequestFailure`)
