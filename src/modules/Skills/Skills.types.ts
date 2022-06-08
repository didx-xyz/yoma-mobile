import { types as ApiTypes } from '~/api'

export interface Skill {
  key: string
  value: string
}

export interface NormalisedSkills {
  ids: string[]
  entities: Record<string, Skill>
}

export interface SkillsResponse {
  data: { data: Skill[] }
  meta: ApiTypes.ApiResponseMeta
}

export type SkillsState = NormalisedSkills
