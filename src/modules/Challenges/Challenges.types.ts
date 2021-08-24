export interface Challenge {
  organisationId: string
  organisationName: string
  organisationLogoURL: string | null
  id: string
  name: string
  description: string
  url: string | null
  createdAt: string
  zltoReward: number
  createdByAdmin: boolean
  language: string
  startTime: string
  endTime: string | null
  published: boolean
}
