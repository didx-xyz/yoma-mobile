import { renderHook } from '@testing-library/react-hooks'

import * as SUT from './AlphabeticListNavigator.hooks'

describe('components/AlphabeticListNavigator/AlphabeticListNavigator.hooks', () => {
  describe('useLetterNavigation', () => {
    it('should return an array of letter navigation objects', () => {
      const { result } = renderHook(() => SUT.useLetterNavigation(300, ['apples', 'axe', 'beef', 'coffee']))
      expect(result.current.letters).toEqual([
        { name: 'a', index: 0 },
        { name: 'b', index: 2 },
        { name: 'c', index: 3 },
      ])
    })
    it('should inject bullets if view height is smaller than nav list', () => {
      const { result } = renderHook(() => SUT.useLetterNavigation(5, ['apples', 'axe', 'beef', 'coffee']))
      expect(result.current.letters).toEqual([
        { name: 'a', index: 0 },
        { name: '•', index: 2, isSpacer: true },
        { name: 'c', index: 3 },
      ])
    })
  })
})
