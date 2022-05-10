import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-test-renderer'

import * as SUT from './SkillSelectField.hooks'

describe('Skills/SkillsFilter/SkillsFilter.hooks', () => {
  describe('useSkillsFilter', () => {
    it('should pass through customers if no search term is provided', () => {
      const skillsMock = [
        'Web Design',
        'Data Science',
        'Presentations',
        'Machine Learning',
        'Business Process Modeling',
        'Digital Marketing',
      ]
      const { result } = renderHook(() => SUT.useSkillsFilter(skillsMock))

      act(() => {
        result.current.setSearchTerm('')
      })

      expect(result.current.results).toEqual([])
    })
    it('should correctly filter the data with a search term', async () => {
      const skillsMock = [
        'Web Design',
        'Data Science',
        'Presentations',
        'Machine Learning',
        'Business Process Modeling',
        'Digital Marketing',
      ]
      const { result } = await renderHook(() => SUT.useSkillsFilter(skillsMock))

      act(() => {
        result.current.setSearchTerm('web')
        result.current.setIsLoading(true)
      })

      expect(result.current.searchTerm).toBe('web')
      expect(result.current.isLoading).toBe(true)
      expect(result.current.results).toEqual(['Web Design', 'Business Process Modeling'])
    })
  })
})
