import { createSelector } from '@reduxjs/toolkit'

import { selectors as SkillsSelectors } from '../Skills'

const selector = createSelector(SkillsSelectors.selectSkills, skills => skills.ids.map(id => skills.entities[id].value))

export default selector
