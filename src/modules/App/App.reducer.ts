import { createAction, createReducer } from '@reduxjs/toolkit'

const name = '[App]'

export const resetAppData = createAction(`${name} clear app data`)
