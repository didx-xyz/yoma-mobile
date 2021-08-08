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

export type UserChallenge = {
  challenge: Challenge
  id: string
  verifiedAt: string
  approved: boolean
  approvalMessage: string | null
  startDate: string
  endDate: string
  createdAt: string
  fileId: null
  fileURL: null
  requestVerification: true
}

export type NormalisedChallenges = {
  ids: string[]
  entities: Record<string, UserChallenge>
}

export type UserChallengesState = NormalisedChallenges
