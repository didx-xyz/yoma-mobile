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
  verifiedAt: string | null
  approved: boolean
  approvalMessage: string | null
  startDate: string
  endDate: string | null
  createdAt: string
  fileId: string | null
  fileURL: string | null
  requestVerification: boolean
}

export type NormalisedUserChallenges = {
  ids: string[]
  entities: Record<string, UserChallenge>
}

export type UserChallengesState = NormalisedUserChallenges
