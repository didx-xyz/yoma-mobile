export type Skills = {
  key: string
  value: string
}

export type SkillsState = {
  filtered: string[]
  allValues: string[]
  allKeys: string[]
  byValue: Record<string, Skills>
  byKey: Record<string, Skills>
}
