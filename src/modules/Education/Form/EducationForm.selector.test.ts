import { rootStateFixture } from '~/redux/redux.fixture'

import SUT from './EducationForm.selector'

describe('modules/Education/EducationForm/EducationForm.selector', () => {
  describe('default', () => {
    it('should return state props required by EducationForm with an empty state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT(state as never) // temp fix - need to look into why this is doing this...

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
      }) as never // temp fix - need to look into why this is doing this...
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
