import { createFixture } from '../../../tests/tests.utils'
import { UserChallenge } from './UserChallenges.types'

export const CHALLENGES_MOCK: UserChallenge[] = [
  {
    challenge: {
      organisationId: '7f9df1bc-10b8-445c-0b4a-08d81d3203ed',
      organisationName: 'Test Org',
      organisationLogoURL: null,
      id: '210a91ff-38b9-42f2-9b50-b6655bbf0f7c',
      name: 'Test Graph',
      description: 'Test Graph',
      url: null,
      createdAt: '2021-02-01T00:00:00',
      zltoReward: 250,
      createdByAdmin: true,
      language: 'EN',
      startTime: '2021-02-01T00:00:00',
      endTime: null,
      published: true,
    },
    id: '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5',
    verifiedAt: '2021-05-02T00:00:00',
    approved: true,
    approvalMessage: null,
    startDate: '2021-04-15T00:00:00',
    endDate: '2021-04-15T00:00:00',
    createdAt: '2021-05-21T00:00:00',
    fileId: null,
    fileURL: null,
    requestVerification: true,
  },
]
export const challengesFixture = createFixture(CHALLENGES_MOCK)