export const defaultUserJobsResponseData = {
  data: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'TITLE',
    description: 'DESCRIPTION',
    createdAt: '2021-08-02T13:24:27.839Z',
    createdByAdmin: true,
    language: 'EN',
    published: true,
    skills: ['string'],
  },
}
export const jobsCredentialsResponseData = {
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
    organisationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    organisationName: 'NAME',
    organisationLogoURL: 'LOGO',
    organisationURL: 'URL',
    organisationPrimaryContactName: 'CONTACT_NAME',
    organisationPrimaryContactEmail: 'EMAIL',
    organisationPrimaryContactPhone: 'PHONE',
    skills: ['SKILL'],
    countries: ['COUNTRY'],
  },
}

export const jobCredentialsStateData = {
  entities: {
    id1: {
      id: 'id1',
      other: 'OTHER DATA',
    },
    id2: {
      id: 'id2',
      other: 'OTHER OTHER DATA',
    },
  },
  ids: ['id1', 'id2'],
}
