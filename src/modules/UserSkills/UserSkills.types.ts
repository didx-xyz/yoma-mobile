import { ApiMetaResponse } from 'api/api.types'

import { UserCredentialFormValues } from '../User/User.types'

export interface SkillVerification {
  name: string
  logoUrl: string
}

export interface UserSkill {
  skillName: string
  verifiedBy: SkillVerification
}

export interface UserSkillsResponse {
  data: { data: UserSkill }
  meta: ApiMetaResponse
}

export interface NormalisedUserSkills {
  ids: string[]
  entities: Record<string, UserSkill>
}

export interface UserSkillsState extends NormalisedUserSkills {
  formValues?: UserCredentialFormValues | null
}
