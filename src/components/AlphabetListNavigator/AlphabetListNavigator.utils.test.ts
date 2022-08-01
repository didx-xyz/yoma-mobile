import * as SUT from './AlphabetListNavigator.utils'

describe('AlphabetListNavigator.utils', () => {
  describe('navLetters', () => {
    it.each([
      [
        ['add', 'art', 'bat', 'card', 'cat', 'client', 'elope', 'end', 'grail'],
        [
          { name: 'a', id: 0 },
          { name: 'b', id: 2 },
          { name: 'c', id: 3 },
          { name: 'e', id: 6 },
          { name: 'g', id: 8 },
        ],
      ],
    ])('should return a list of single de-duped characters', (data, expected) => {
      const result = SUT.navLetters(data)
      expect(result).toEqual(expected)
    })
  })
})
