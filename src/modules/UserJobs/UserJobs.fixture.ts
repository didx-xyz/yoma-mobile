import { createFixture } from 'tests/tests.utils'

import { UserJobCredential } from './UserJobs.types'

export const USER_JOBS_MOCK: UserJobCredential[] = [
  {
    id: '11111-5717-4562-b3fc-2c963f66afa6',
    verifiedAt: '2021-08-02T10:32:47.330Z',
    approved: true,
    approvalMessage: 'string',
    startDate: '2021-06-02T10:32:47.330Z',
    endDate: '2021-08-02T10:32:47.330Z',
    createdAt: '2021-08-02T10:32:47.330Z',
    fileId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    fileURL: 'string',
    requestVerification: true,
    job: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'TITLE',
      description: 'DESCRIPTION',
      createdAt: '2021-08-02T10:32:47.302Z',
      createdByAdmin: true,
      language: 'EN',
      published: true,
      skills: ['SKILL'],
      countries: ['COUNTRY'],
      organisationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      organisationName: 'NAME',
      organisationLogoURL: 'LOGO',
      organisationURL: 'URL',
      organisationPrimaryContactName: 'CONTACT_NAME',
      organisationPrimaryContactEmail: 'EMAIL',
      organisationPrimaryContactPhone: 'PHONE',
    },
  },
]

export const USER_JOBS_NORMALISED_MOCK = {
  ids: ['11111-5717-4562-b3fc-2c963f66afa6'],
  entities: { '11111-5717-4562-b3fc-2c963f66afa6': USER_JOBS_MOCK[0] },
}

export const userJobsFixture = createFixture(USER_JOBS_MOCK)
export const userJobsStateFixture = createFixture(USER_JOBS_NORMALISED_MOCK)
