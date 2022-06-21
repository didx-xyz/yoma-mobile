import { createFixture } from '~/../tests/tests.utils'

import { INITIAL_FORM_VALUES } from './Form/UserQualificationsForm.constants'

export const USER_QUALIFICATIONS_MOCK = [
  {
    qualification: {
      organisationId: '7f9df1bc-10b8-445c-0b4a-08d81d3203ed',
      organisationName: 'Test Org',
      organisationLogoURL: null,
      id: '210a91ff-38b9-42f2-9b50-b6655bbf0f7c',
      title: 'Test Graph',
      description: 'Test Graph',
      url: null,
      createdAt: '2021-02-01T00:00:00',
      zltoReward: 250,
      createdByAdmin: true,
      language: 'EN',
      startTime: '2021-02-01T00:00:00',
      endTime: null,
      published: true,
      instructions: null,
      difficulty: null,
      timeValue: null,
      timePeriod: null,
      organisationURL: null,
      organisationPrimaryContactName: null,
      organisationPrimaryContactEmail: null,
      organisationPrimaryContactPhone: null,
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

export const USER_QUALIFICATIONS_STATE_MOCK = {
  ids: ['USER_QUALIFICATIONS_STATE_MOCK-001', 'USER_QUALIFICATIONS_STATE_MOCK-002'],
  entities: {
    'USER_QUALIFICATIONS_STATE_MOCK-001': {
      qualification: {
        organisationId: '7f9df1bc-10b8-445c-0b4a-08d81d3203ed',
        organisationName: 'Test Org',
        organisationLogoURL: null,
        id: '210a91ff-38b9-42f2-9b50-b6655bbf0f7c',
        title: 'Test Qualification',
        description: 'Test Graph',
        url: null,
        createdAt: '2021-02-01T00:00:00',
        zltoReward: 250,
        createdByAdmin: true,
        language: 'EN',
        startTime: '2021-02-01T00:00:00',
        endTime: null,
        published: true,
        instructions: null,
        difficulty: null,
        timeValue: null,
        timePeriod: null,
        organisationURL: null,
        organisationPrimaryContactName: null,
        organisationPrimaryContactEmail: null,
        organisationPrimaryContactPhone: null,
      },
      id: 'USER_QUALIFICATIONS_STATE_MOCK-001',
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
    'USER_QUALIFICATIONS_STATE_MOCK-002': {
      qualification: {
        organisationId: '7f9df1bc-10b8-445c-0b4a-08d81d3203ed',
        organisationName: 'Test Org',
        organisationLogoURL: null,
        id: '210a91ff-38b9-42f2-9b50-b6655bbf0f7c',
        title: 'Test Qualification',
        description: 'Test Graph',
        url: null,
        createdAt: '2021-02-01T00:00:00',
        zltoReward: 250,
        createdByAdmin: false,
        language: 'EN',
        startTime: '2021-02-01T00:00:00',
        endTime: null,
        published: true,
        instructions: null,
        difficulty: null,
        timeValue: null,
        timePeriod: null,
        organisationURL: null,
        organisationPrimaryContactName: null,
        organisationPrimaryContactEmail: null,
        organisationPrimaryContactPhone: null,
      },
      id: 'USER_QUALIFICATIONS_STATE_MOCK-002',
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
  },
  formFields: INITIAL_FORM_VALUES,
}

export const userQualificationsStateFixture = createFixture(USER_QUALIFICATIONS_STATE_MOCK)
