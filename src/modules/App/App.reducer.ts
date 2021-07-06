import { createAction } from '@reduxjs/toolkit'

const name = '[App]'

export const resetAppData = createAction(`${name} resetAppData`)
export const fetchInitial = createAction(`${name} fetchInitial`)
