import { createAction } from '@reduxjs/toolkit'

const name = '[Error]'

export const unauthorizedError = createAction(`${name} unauthorizedError`)
