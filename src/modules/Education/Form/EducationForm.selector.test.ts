import { rootStateFixture } from '~/redux/redux.fixture'

import SUT from './EducationForm.selector'

describe('modules/Education/EducationForm/EducationForm.selector', () => {
  describe('default ', () => {
    it('should return state props required by EducationForm with an empty state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT(state)

      // then ... should return result as expected
      expect(result).toEqual({
        organisations: [],
        skills: [],
      })
    })
    it('should return state props required by EducationForm with an populated state', () => {
      const stateMock = rootStateFixture({
        skills: {
          ids: ['idA', 'idB'],
          entities: {
            idA: { value: 'Skill A' },
            idB: { value: 'Skill B' },
          },
        },
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
        skills: [
          { label: 'Skill A', value: 'Skill A' },
          { label: 'Skill B', value: 'Skill B' },
        ],
      })
    })
  })
})
