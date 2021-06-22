import { createAction } from '@reduxjs/toolkit'

import { AppActions } from './types'

export const resetAppData = createAction(AppActions.resetApp)
