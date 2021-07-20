export type Qualification = {
  organisationId: string
  organisationName: string
  organisationLogoURL: string
  organisationURL: string
  organisationPrimaryContactName: string
  organisationPrimaryContactEmail: string
  organisationPrimaryContactPhone: string
  id: string
  title: string
  description: string
  url: string
  createdAt: string
  zltoReward: number
  createdByAdmin: boolean
  language: string
  startTime: string
  endTime: string
  published: boolean
}
export type Credential = {
  qualification: Qualification
  id: string
  verifiedAt: string
  approved: boolean
  approvalMessage: string
  startDate: string
  endDate: string
  createdAt: string
  fileId: string
  fileURL: string
  requestVerification: boolean
}
