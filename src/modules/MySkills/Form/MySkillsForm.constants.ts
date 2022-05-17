import { SkillAdded } from '~/modules/UserSkills/UserSkills.types'

import { UserSkillsField } from './MySkillsForm.types'

export const INITIAL_VALUES: UserSkillsField = {
  skills: [] as SkillAdded[],
}
