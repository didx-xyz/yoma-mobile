export type QualificationResponsePayload = {
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

export type QualificationRequestPayload = {
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

export type CredentialRequestPayload = {
  type: string
  credentialItemId: string
  startTime: string
  endTime: string
  requestVerification: boolean
}
