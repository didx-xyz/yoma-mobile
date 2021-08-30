import { ApiMetaResponse } from 'api/api.types'

export interface SkillVerification {
  name: string
  logoUrl: string
}

export interface UserSkill {
  skillName: string
  verifiedBy: SkillVerification
}

export interface UserSkillsResponse {
  data: { data: UserSkill[] }
  meta: ApiMetaResponse
}

export type UserSkillsState = UserSkill[]
