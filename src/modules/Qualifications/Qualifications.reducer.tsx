import { createAction, createReducer } from '@reduxjs/toolkit'

import { QualificationRequestPayload, QualificationResponsePayload } from './Qualifications.types'

const name = '[Qualifications]'
export const INITIAL_STATE = [] as any
export const setQualifications = createAction<any>(`${name} setQualifications`)

export const createQualifications = createAction<QualificationRequestPayload>(`${name} createQualifications`)
export const createQualificationsSuccess = createAction<QualificationResponsePayload>(
  `${name} createQualificationsSuccess`,
)
export const createQualificationsFailure = createAction<string>(`${name} createQualificationsFailure`)
export const clearQualifications = createAction(`${name} clearQualifications`)

const QualificationsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setQualifications, (_, action) => action.payload)
  builder.addCase(clearQualifications, (_state, _action) => INITIAL_STATE)
})

export default QualificationsReducer
