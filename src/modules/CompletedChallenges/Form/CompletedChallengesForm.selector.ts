import { createSelector } from '@reduxjs/toolkit'
import { map, pipe, values } from 'ramda'

import { selectChallenges } from '~/modules/Challenges/Challenges.selectors'
import { Challenge } from '~/modules/Challenges/Challenges.types'

export default createSelector(selectChallenges, challenges => {
  const challengesDropDown = pipe(
    map((challenge: Challenge) => ({ value: challenge.id, label: challenge.title })),
    values,
  )(challenges.entities)
  return { challenges, challengesDropDown }
})
