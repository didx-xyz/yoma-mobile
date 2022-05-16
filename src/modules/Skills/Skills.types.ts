import { types as ApiTypes } from '~/api'

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
  meta: ApiTypes.ApiResponseMeta
}

export interface SkillsState extends NormalisedSkills {
  searchTerm?: string
}
