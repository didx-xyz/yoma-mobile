import { rootStateFixture } from '~/redux/redux.fixture'

import SUT from './UserQualificationsForm.selector'

describe('modules/UserQualifications/UserQualificationsForm/UserQualificationsForm.selector', () => {
  describe('default', () => {
    it('should return state props required by EducationForm with an empty state', () => {
      const state = rootStateFixture()

      // when ... we call the selector
      const result = SUT(state)

      // then ... should return result as expected
      expect(result).toEqual({
        organisations: [],
      })
    })
    it('should return state props required by EducationForm with an populated state', () => {
      const stateMock = rootStateFixture({
        organisations: {
          ids: ['id1', 'id2'],
          entities: {
            id1: { value: 'Org 1', key: 'id1' },
            id2: { value: 'Org 2', key: 'id2' },
          },
        },
      })

      // when ... we call the selector
      const result = SUT(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        organisations: [
          { label: 'Org 1', value: 'id1' },
          { label: 'Org 2', value: 'id2' },
        ],
      })
    })
  })
})
