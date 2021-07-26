import * as SUT from './Skills.utils'

describe('modules/Skills/Skills.utils', () => {
  describe('extractSkillsFromPayload', () => {
    it('should return the skills data from payload', () => {
      // given ... an object in the shape of the successful response
      const mockedAction = {
        type: 'ACTION',
        payload: {
          data: {
            data: [
              {
                key: 'SOME_KEY',
                value: 'SOME_VALUE',
              },
            ],
          },
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractSkillsFromPayload(mockedAction)
      // then ... the data should be extracted correctly
      expect(result).toEqual([
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ])
    })
  })
})
