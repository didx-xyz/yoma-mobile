import { createSelector } from '@reduxjs/toolkit'
import { pick } from 'ramda'
import { RootState } from 'redux/redux.types'

const selectAuth = (state: RootState) => state.user
export const selectUserData = createSelector(selectAuth, pick(['profile']))
