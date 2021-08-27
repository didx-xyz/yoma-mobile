import { ApiMetaResponse } from 'api/api.types'

import { UserCredentialFormValues } from '../User/User.types'

export interface UserSkill {}

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
