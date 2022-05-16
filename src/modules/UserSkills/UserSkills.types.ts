import { ApiResponseMeta } from '~/api/api.types'

export interface SkillVerification {
  name: string
  logoUrl: string
}

export enum UserSkillKeys {
  SkillName = 'skillName',
  VerifiedBy = 'verifiedBy',
}

export interface UserSkill {
  [UserSkillKeys.SkillName]: string
  [UserSkillKeys.VerifiedBy]: SkillVerification | null
}

export interface UserSkillsResponse {
  data: { data: UserSkill[] }
  meta: ApiResponseMeta
}

export interface NormalisedUserSkills {
  ids: string[]
  entities: Record<string, UserSkill>
}

export interface UserSkillsState extends NormalisedUserSkills {}

export type SkillAdded = string
