import { jobsCredentialsResponseData } from 'modules/Job/Job.test.fixtures'

import * as SUT from './Experience.utils'

describe('modules/Experience/Experience.utils', () => {
  describe('extractExperienceFormValues', () => {
    it('should return experience form values from job credential payload', () => {
      //given ...
      //when .. extractExperienceFormValues
      const result = SUT.extractExperienceFormValues(jobsCredentialsResponseData)
      //then result should equal job request payload data
      expect(result).toEqual({
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        credentialId: '11111-5717-4562-b3fc-2c963f66afa6',
        title: 'TITLE',
        description: 'DESCRIPTION',
        language: 'EN',
        published: true,
        skillNames: ['SKILL'],
        organisationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        startTime: '2021-06-02T10:32:47.330Z',
        endTime: '2021-08-02T10:32:47.330Z',
      })
    })
  })
})
