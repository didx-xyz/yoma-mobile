import { rootStateFixture } from '../../redux/redux.test.fixtures'
import { USER_JOBS_MOCK } from '../UserJobs/UserJobs.test.fixtures'
import * as SUT from './Experience.selector'

describe('modules/Experience/Experience.selector', () => {
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
      const result = SUT.selectUserJobItems(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        ids: ['11111-5717-4562-b3fc-2c963f66afa6'],
        entities: {
          '11111-5717-4562-b3fc-2c963f66afa6': {
            title: 'TITLE',
            subtitle: 'NAME',
            iconUrl: 'LOGO',
            isValidated: true,
            description: 'DESCRIPTION',
          },
        },
      })
    })
  })
  describe('default selector', () => {
    it('should handle an empty state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        userJobs: {
          ids: [],
          entities: {},
        },
        skills: [],
        organisations: [],
      })
    })
    it('should return userJobs, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        userJobs: {
          ids: ['id1'],
          entities: {
            id1: {
              approved: true,
              job: {
                title: 'TITLE',
                description: 'DESCRIPTION',
                organisationName: 'NAME',
                organisationLogoURL: 'LOGO',
              },
            },
          },
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

      // then ... should return the data required by the experience view
      expect(result).toEqual({
        userJobs: {
          ids: ['id1'],
          entities: {
            id1: {
              title: 'TITLE',
              subtitle: 'NAME',
              iconUrl: 'LOGO',
              isValidated: true,
              description: 'DESCRIPTION',
            },
          },
        },
        organisations: [{ label: 'organisation', value: 'key1' }],
        skills: [{ label: 'skill', value: 'skill' }],
      })
    })
  })
})
