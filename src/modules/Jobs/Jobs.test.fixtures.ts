import { createFixture } from 'tests/tests.utils'

import { Job } from './Jobs.types'

export const JOB_MOCK: Job = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  title: 'TITLE',
  description: 'DESCRIPTION',
  createdAt: '2021-08-02T13:24:27.839Z',
  createdByAdmin: true,
  language: 'EN',
  published: true,
  skills: ['string'],
}
export const jobFixture = createFixture(JOB_MOCK)
