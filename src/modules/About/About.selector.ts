import { createSelector } from '@reduxjs/toolkit'

import { selectBiography } from '~/modules/User/User.selector'

export default createSelector<any, { biography: string }>(selectBiography, (biography: string) => ({
  biography,
}))
