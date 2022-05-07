import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-test-renderer'

import * as SUT from './SkillSelectField.hooks'

describe('Skills/SkillsFilter/SkillsFilter.hooks', () => {
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
