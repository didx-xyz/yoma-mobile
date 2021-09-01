import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './UserJobs.selector'
import { USER_JOBS_MOCK } from './UserJobs.test.fixtures'

describe('modules/UserJobs/UserJobs.selector', () => {
  describe('selectUserJobs ', () => {
    it('should return UserJobs property of the root state', () => {
      const stateMock = rootStateFixture({
        userJobs: 'UserJobs Object',
      })
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.selectUserJobs(stateMock)

      // then ... should return result as expected
      expect(result).toEqual('UserJobs Object')
    })
    it('should return the default UserJobs state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectUserJobs(state)

      // then ... should return result as expected
      expect(result).toEqual(state.userJobs)
    })
  })
  describe('selectUserJobItems', () => {
    it('should return userJobsItems from userJobs state', () => {
      const stateMock = rootStateFixture({
        userJobs: {
          ids: ['11111-5717-4562-b3fc-2c963f66afa6'],
          entities: { '11111-5717-4562-b3fc-2c963f66afa6': USER_JOBS_MOCK[0] },
        },
      })
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result.userJobs).toEqual([
        {
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
          startDate: '2021-06-02T10:32:47.330Z',
          endDate: '2021-08-02T10:32:47.330Z',
        },
      ])
    })
    it('should return an empty array by default', () => {
      const stateMock = rootStateFixture({
        userJobs: {
          ids: [],
          entities: {},
        },
      })
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result.userJobs).toEqual([])
    })
  })
  describe('selectFormValues ', () => {
    it('should return formValues object from the userJobs state', () => {
      const userJobsStateMock = {
        ids: 'IDS',
        entities: 'ENTITIES_DATA',
        formValues: 'FORM_VALUES',
      }

      const mockState = rootStateFixture({
        userJobs: userJobsStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectFormValues(mockState)

      // then ... should return result as expected
      expect(result).toEqual('FORM_VALUES')
    })
  })
  describe('selector', () => {
    it('should return userJobs, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        userJobs: {
          ids: ['id1'],
          entities: { id1: { job: 'Job Data', startDate: 'Start Data', endDate: 'End Date' } },
        },
        skills: {
          ids: ['key1'],
          entities: { key1: { key: 'key1', value: 'skill' } },
        },
        organisations: {
          ids: ['key1'],
          entities: { key1: { key: 'key1', value: 'organisation' } },
        },
      })
      // when ... we call the selector
      const result = SUT.default(mockState)

      // then ... should return result as expected
      expect(result).toEqual({
        userJobs: [{ job: 'Job Data', startDate: 'Start Data', endDate: 'End Date' }],
        organisations: [{ label: 'organisation', value: 'key1' }],
        skills: [{ label: 'skill', value: 'skill' }],
      })
    })
  })
})
