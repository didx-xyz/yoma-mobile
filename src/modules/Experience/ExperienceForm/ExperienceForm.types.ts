export type DropDownOrg = {
  label: string
  value: string
}
export type DropDownSkill = {
  label: string
  value: string
}

export type ExperienceFields = {
  title: string
  description: string
  id: string
  startDate: Date | null
  endDate: Date | null
  country: string
  skillNames: string[]
  organisationId: string
  organisationName: string
  organisationWebsite: string
  primaryContactName: string
  primaryContactEmail: string
  noResultInd: boolean
  requestVerificationInd: boolean
}
