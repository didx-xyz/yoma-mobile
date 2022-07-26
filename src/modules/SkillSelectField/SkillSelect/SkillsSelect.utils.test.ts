import * as SUT from './SkillSelect.utils'

describe('modules/SkillSelectField/SkillSelect/SkillSelect.utils', () => {
  describe('filterSkills', () => {
    it.each([
      ['we', ['Web Design']],
      ['Da', ['Data Science']],
      ['de', ['Web Design', 'Business Process Modeling', 'Mobile Application Development', 'Design Thinking']],
    ])('should correctly filter a given list of skills', async (term, expected) => {
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
      const result = await SUT.filterSkills(skillsMock, term)
      expect(result).toEqual(expected)
    })
  })
})
