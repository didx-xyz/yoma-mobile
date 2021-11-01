import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-test-renderer'

import * as SUT from './SkillSelectField.hooks'

describe('Skills/SkillsFilter/SkillsFilter.hooks', () => {
  describe('filterSkills', () => {
    it.each([
      ['we', ['Web Design']],
      ['Da', ['Data Science']],
      ['de', ['Web Design', 'Business Process Modeling', 'Mobile Application Development', 'Design Thinking']],
    ])('should correctly filter a given list of skills', (term, expected) => {
      const skillsMock = [
        'Web Design',
        'Data Science',
        'Presentations',
        'Machine Learning',
        'Business Process Modeling',
        'Digital Marketing',
        'Computer Literacy',
        'Mobile Application Development',
        '.NET Assemblies',
        'Design Thinking',
      ]
      const result = SUT.filterSkills(skillsMock, term)
      expect(result).toEqual(expected)
    })
  })
  describe('useSkillsFilter', () => {
    describe('useFilterCustomers', () => {
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

        expect(result.current.filteredSkills).toEqual([
          'Web Design',
          'Data Science',
          'Presentations',
          'Machine Learning',
          'Business Process Modeling',
          'Digital Marketing',
        ])
      })
      it('should correctly filter the data with a search term', () => {
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
          result.current.setSearchTerm('de')
        })

        expect(result.current.filteredSkills).toEqual(['Web Design', 'Business Process Modeling'])
      })
    })
  })
})
