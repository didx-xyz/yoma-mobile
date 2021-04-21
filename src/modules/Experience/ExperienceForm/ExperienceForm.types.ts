export type DropDownOrg = {
  label: string
  value: string
}
export type Organization = {
  key: string
  value: string
}

export type ExperienceValue = {
  // details
  title: string
  description: string
  id: string
  // startDate: '2021-04-09T05:52:02.872Z',
  // endDate: '2021-04-09T05:52:02.872Z',
  startDate: string
  endDate: string

  // country
  country: string
  // skills developed
  skillNames: string[]

  // organisation
  organisationId: string
  organisationName: string
  organisationWebsite: string
  primaryContactName: string
  primaryContactEmail: string

  noResultInd: boolean
  requestVerificationInd: boolean
}
