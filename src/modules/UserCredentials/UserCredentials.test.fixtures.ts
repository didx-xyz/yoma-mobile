import { createFixture } from '../../../tests/tests.utils'
import { INITIAL_STATE } from './UserCredentials.reducer'

export const USER_CREDENTIALS_RESPONSE = [
  {
    qualification: {
      organisationId: 'ORGANISATION_ID',
      organisationName: 'ORGANISATION_NAME',
      organisationLogoURL: 'ORGANISATION_LOGO_URL',
      organisationURL: 'ORGANISATION_URL',
      organisationPrimaryContactName: 'ORGANISATION_PRIMARY_CONTACTNAME',
      organisationPrimaryContactEmail: 'ORGANISATION_PRIMARY_CONTACTEMAIL',
      organisationPrimaryContactPhone: 'ORGANISATION_PRIMARY_CONTACTPHONE',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'TITLE',
      description: 'DESCRIPTION',
      url: 'url',
      createdAt: '2021-07-25T17:17:12.283Z',
      zltoReward: 0,
      createdByAdmin: true,
      language: 'LANGUAGE',
      startTime: '2021-07-25T17:17:12.283Z',
      endTime: '2021-07-25T17:17:12.283Z',
      published: true,
    },
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    verifiedAt: '2021-07-25T17:17:12.283Z',
    approved: true,
    approvalMessage: 'approvalMessage',
    startDate: '2021-07-25T17:17:12.283Z',
    endDate: '2021-07-25T17:17:12.283Z',
    createdAt: '2021-07-25T17:17:12.283Z',
    fileId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    fileURL: 'fileURL',
    requestVerification: true,
  },
]

export const userCredentialsStateFixture = createFixture(USER_CREDENTIALS_RESPONSE)
export const userInitialStateFixture = createFixture(INITIAL_STATE)
