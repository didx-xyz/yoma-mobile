import { createSelector } from '@reduxjs/toolkit'
import { selectUser } from 'modules/User/User.selector'
import { pick } from 'ramda'

export default createSelector(selectUser, pick([])) //TODO: add path
