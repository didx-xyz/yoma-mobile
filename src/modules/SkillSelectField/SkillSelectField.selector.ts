import { createSelector } from '@reduxjs/toolkit'

import { selectSkills } from '../Skills/Skills.selector'

const selector = createSelector(selectSkills, skills => {
  return skills.ids.map(id => skills.entities[id].value)
})

export default selector
