export type DropDownOrg = {
  label: string
  value: string
}
export type Organization = {
  key: string
  value: string
}

export type ExperienceValue = {
  title: string
  description: string
  id: string
  startDate: string
  endDate: string
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
