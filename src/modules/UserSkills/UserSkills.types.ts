import { ApiResponseMeta } from '~/api/api.types'

export interface SkillVerification {
  name: string
  logoUrl: string
}

export enum UserSkillKeys {
  SkillName = 'skillName',
  VerifiedBy = 'verifiedBy',
  Visible = 'visible',
  Count = 'count',
}

export interface UserSkill {
  [UserSkillKeys.SkillName]: string
  [UserSkillKeys.VerifiedBy]: SkillVerification | null
  [UserSkillKeys.Visible]?: boolean | null
  [UserSkillKeys.Count]?: number
}

export interface UserSkillsResponse {
  data: { data: UserSkill[] }
  meta: ApiResponseMeta
}

export type SkillAdded = string

export interface UserAddSkillsResponse {
  data: {
    data: { skills: SkillAdded[] }
    meta: ApiResponseMeta
  }
  status: number
  statusText?: string | undefined
}

export interface NormalisedUserSkills {
  ids: string[]
  entities: Record<string, UserSkill>
}

export interface UserSkillsState extends NormalisedUserSkills {}
