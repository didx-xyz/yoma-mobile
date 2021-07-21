export type OrganizationResponsePayload = {
  id: string
  name: string
  url: string
  logoURL: string
  companyRegistrationURL: string
  primaryContactName: string
  primaryContactEmail: string
  primaryContactPhone: string
  countriesAlpha2: [string]
  tagline: string
  biography: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  approvedAt: string
  editable: boolean
  registered: boolean
}
