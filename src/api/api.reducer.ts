import { createAction } from '@reduxjs/toolkit'

const name = '[api]'
export const apiGet = createAction<any>(`${name} apiGet`)
export const apiGetSuccess = createAction<any>(`${name} apiGetSuccess`)
export const apiGetFailure = createAction<any>(`${name} apiGetFailure`)

export const apiPush = createAction<any>(`${name} apiPush`)
export const apiPushSuccess = createAction<any>(`${name} apiPushSuccess`)
export const apiPushFailure = createAction<any>(`${name} apiPushFailure`)
