import { createSelector } from '@reduxjs/toolkit'

import { selectChallenges } from '../../Challenges/Challenges.selectors'

export default createSelector(selectChallenges, challenges => ({ challenges }))
