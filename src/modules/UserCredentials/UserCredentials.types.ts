export type UserCredentialRequestPayload = {
  type: string
  credentialItemId: string
  startTime: string
  endTime: string
  requestVerification: boolean
}

export interface UserCredentialCertificate {
  id: string
  verifiedAt: string
  approved: boolean
  startDate: string
  endDate: string
  createdAt: string
  fileURL: string
  fileId: string
  requestVerification: boolean
}
