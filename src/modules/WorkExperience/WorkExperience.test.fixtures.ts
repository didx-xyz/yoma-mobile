import { createFixture } from 'tests/tests.utils'

import { WorkExperience } from './WorkExperience.types'

export const WORK_EXPERIENCE_MOCK: WorkExperience = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  title: 'TITLE',
  description: 'DESCRIPTION',
  createdAt: '2021-08-02T13:24:27.839Z',
  createdByAdmin: true,
  language: 'EN',
  published: true,
  skills: ['string'],
}
export const workExperienceFixture = createFixture(WORK_EXPERIENCE_MOCK)
