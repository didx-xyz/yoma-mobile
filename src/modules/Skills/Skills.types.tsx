import { ApiMetaResponse } from '~/modules/Auth/Auth.types'

export type Skill = {
  key: string
  value: string
}

export type NormalisedSkills = {
  ids: string[]
  entities: Record<string, Skill>
}

export type SkillsResponse = {
  data: { data: Skill[] }
  meta: ApiMetaResponse
}

export interface SkillsState extends NormalisedSkills {
  searchTerm?: string
}
